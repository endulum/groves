import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

import { VoteWidget } from "./VoteWidget";
import { useGet } from "../hooks/useGet";
import { type Reply } from "../types";

export function Reply({
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
      {/* content */}
      <div className="reply-content flex-row gap-1">
        <VoteWidget data={data} />
        <div>
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
      </div>

      {/* list of children */}
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

          {/* "load more children" link for child overflow */}
          {loadMoreChildren && (
            <small>
              {loading ? (
                <span>Loading more replies...</span>
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

      {/* "load children" link for revealing children */}
      {loadChildren && (
        <small>
          {loading ? (
            <span>Loading replies...</span>
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
