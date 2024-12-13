import { Link } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { useLogger } from "../../hooks/useLogger";
import { LoadingSpacer } from "../LoadingSpacer";
import { useEffect, useState } from "react";

interface Reply {
  author: {
    id: number;
    username: string;
  };
  _count: {
    upvotes: number;
    downvotes: number;
    children: number;
  };
  id: string;
  content: string;
  parentId: string;
  datePosted: string;
  children?: Reply[];
  loadChildren?: string;
  loadMoreChildren?: string;
}

export function RepliesSubroute({ postId }: { postId: string }) {
  const { loading, error, data } = useGet<{
    loadMoreChildren: string | null;
    children: Reply[];
  }>(`/post/${postId}/replies`);

  useLogger({ data });

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;
  if (data)
    return (
      <div className="replies flex-col align-start gap-0-5">
        {data.children.map((child) => (
          <Reply data={child} shaded={false} firstLevel={true} key={child.id} />
        ))}
      </div>
    );
}

function Reply({
  data,
  shaded,
  firstLevel,
}: {
  data: Reply;
  shaded: boolean;
  firstLevel: boolean;
}) {
  const [loadChildren, setLoadChildren] = useState<string | null>(
    data.loadChildren ?? null
  );

  const [loadMoreChildren, setLoadMoreChildren] = useState<string | null>(
    data.loadMoreChildren ?? null
  );

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const [replyChildren, setReplyChildren] = useState<Reply[]>(
    data.children ?? []
  );

  const {
    loading,
    error,
    data: childrenData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: Reply[];
  }>(nextUrl as string); // somehow assert that we'll only call this when the string is set

  useEffect(() => {
    get(false);
  }, [nextUrl]);

  useEffect(() => {
    if (childrenData) {
      setReplyChildren([...replyChildren, ...childrenData.children]);
      setLoadChildren(childrenData.loadChildren);
      setLoadMoreChildren(childrenData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [childrenData]);

  const clickToLoadMoreChildren = () => {
    setNextUrl(loadMoreChildren);
  };

  const clickToLoadChildren = () => {
    setNextUrl(loadChildren);
  };

  return (
    <div
      className={`reply${shaded ? " shaded" : ""}${
        firstLevel ? " first-level" : ""
      }`}
      id={data.id}
    >
      <div className="reply-content">
        <small>
          by{" "}
          <Link to={`/user/${data.author.username}`}>
            {data.author.username}
          </Link>{" "}
          {DateTime.fromISO(data.datePosted).toRelative()}
        </small>
        <br />
        {data.content}
        <br />
        <small>
          <a href={`#${data.parentId}`}>parent</a>
        </small>
      </div>

      {replyChildren.length > 0 && (
        <>
          <div className="reply-children flex-col align-start gap-0-5">
            {replyChildren.map((child) => (
              <Reply
                data={child}
                shaded={!shaded}
                firstLevel={false}
                key={child.id}
              />
            ))}
          </div>
          {loadMoreChildren && (
            <small>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <a
                  className="reply-loadmore"
                  onClick={clickToLoadMoreChildren}
                  title={loadMoreChildren}
                >
                  Load more replies
                </a>
              )}
            </small>
          )}
        </>
      )}
      {loadChildren && (
        <small>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <a
              className="reply-loadmore"
              onClick={clickToLoadChildren}
              title={loadChildren}
            >
              Load replies
            </a>
          )}
        </small>
      )}
    </div>
  );
}
