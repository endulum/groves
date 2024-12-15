import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import { VoteWidget } from "./VoteWidget";
import { useGet } from "../hooks/useGet";
import { type Reply } from "../types";
import { gatherChildrenIds } from "../functions/gatherChildrenIds";

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

  const [collapsed, setCollapsed] = useState<boolean>(false);

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

  const getTotalChildCount = () => {
    return gatherChildrenIds(replyChildren).length;
  };

  return (
    <div
      className={`reply${shaded ? " shaded" : ""}${
        firstLevel ? " first-level" : ""
      }`}
      id={data.id}
    >
      {collapsed ? (
        <>
          <button
            className="button reply-collapse collapsed"
            title="Show reply tree"
            onClick={() => {
              setCollapsed(false);
            }}
          >
            <ExpandMore />
          </button>
          <div className="reply-content mb-0 collapsed">
            <small>
              <Link to={`/user/${data.author.username}`}>
                {data.author.username}
              </Link>{" "}
              replied{" "}
              <span title={data.datePosted}>
                {DateTime.fromISO(data.datePosted).toRelative()}
              </span>{" "}
              with{" "}
              <span>{data._count.upvotes - data._count.downvotes} points</span>
              {" ("}
              <span>{`${getTotalChildCount()} children`}</span>
              {")"}
            </small>
          </div>
        </>
      ) : (
        <>
          {/* content */}
          <button
            className="button reply-collapse expanded"
            title="Hide reply tree"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <ExpandLess />
          </button>
          <div className="reply-content flex-row gap-1">
            <VoteWidget data={data} />
            <div>
              <small>
                <Link to={`/user/${data.author.username}`}>
                  {data.author.username}
                </Link>{" "}
                replied{" "}
                <span title={data.datePosted}>
                  {DateTime.fromISO(data.datePosted).toRelative()}
                </span>
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
        </>
      )}
    </div>
  );
}

export function NullParentReplies({ data }: { data: Reply }) {
  // dry this up?
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
  }>(nextUrl as string);

  useEffect(() => {
    get(false);
  }, [nextUrl]);

  useEffect(() => {
    if (childrenData) {
      setReplyChildren([...replyChildren, ...childrenData.children]);
      setLoadMoreChildren(childrenData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [childrenData]);

  const clickToLoadMoreChildren = () => {
    setNextUrl(loadMoreChildren);
  };

  return (
    <>
      {replyChildren.map((child) => (
        <Reply data={child} shaded={false} firstLevel={true} key={child.id} />
      ))}

      {data?.loadMoreChildren && (
        <small>
          {loading ? (
            <span>Loading more replies...</span>
          ) : (
            <a
              className="reply-loadmore"
              onClick={clickToLoadMoreChildren}
              title={nextUrl ?? undefined}
            >
              Load more replies
            </a>
          )}
        </small>
      )}
    </>
  );
}
