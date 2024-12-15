import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import { ExpandLess, ExpandMore, ShieldOutlined } from "@mui/icons-material";

import { VoteWidget } from "./VoteWidget";
import { useGet } from "../hooks/useGet";
import { type Reply } from "../types";
import { gatherChildrenIds } from "../functions/gatherChildrenIds";
import { MDWrapper } from "./MDWrapper";
import { ReplyForm } from "./ReplyForm";
import { HideReply } from "./forms/ModReplyActions";
import { useLogger } from "../hooks/useLogger";

export function Reply({
  data,
  shaded,
  firstLevel,
  isMod,
}: {
  data: Reply;
  shaded: boolean;
  firstLevel: boolean;
  isMod: boolean;
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

  const [replying, setReplying] = useState<boolean>(false);

  const [hidden, setHidden] = useState<boolean>(data.hidden);

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
      setReplyChildren([
        ...replyChildren,
        ...childrenData.children.filter((r) => !replyChildren.includes(r)),
      ]);
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

  const addNewReply = (newReply: Reply) => {
    setReplyChildren([...replyChildren, newReply]);
  };

  useLogger({ hidden });

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
              {!hidden && data.author ? (
                <Link to={`/user/${data.author.username}`}>
                  {data.author.username}
                </Link>
              ) : (
                "(hidden)"
              )}{" "}
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
            <div className="reply-body">
              <small>
                {!hidden && data.author ? (
                  <Link to={`/user/${data.author.username}`}>
                    {data.author.username}
                  </Link>
                ) : (
                  "(hidden)"
                )}{" "}
                replied{" "}
                <span title={data.datePosted}>
                  {DateTime.fromISO(data.datePosted).toRelative()}
                </span>
              </small>
              <br />
              {!hidden && data.content ? (
                <MDWrapper content={data.content} />
              ) : (
                <p>
                  <i>this content has been hidden</i>
                </p>
              )}

              {/* action row */}
              <div className="link-row mt-0-5 flex-row gap-0-5">
                {data.parentId &&
                  (firstLevel ? (
                    <Link
                      type="button"
                      className="button plain-accent-2"
                      to={`/post/${data.postId}/reply/${data.parentId}`}
                      title="Go to the parent of this post"
                    >
                      <small>parent</small>
                    </Link>
                  ) : (
                    <a
                      type="button"
                      className="button plain-accent-2"
                      href={`#${data.parentId}`}
                      title="Jump to the parent of this post"
                    >
                      <small>parent</small>
                    </a>
                  ))}
                <Link
                  type="button"
                  className="button plain-accent-2"
                  to={`/post/${data.postId}/reply/${data.id}`}
                  title="View this post on its own"
                >
                  <small>isolate</small>
                </Link>
                {replying ? (
                  <button
                    type="button"
                    className="button plain-accent-2"
                    onClick={() => setReplying(false)}
                  >
                    <small style={{ color: "crimson" }}>cancel replying</small>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button plain-accent-2"
                    onClick={() => setReplying(true)}
                  >
                    <small>reply</small>
                  </button>
                )}
                {isMod && (
                  <>
                    <button type="button" className="button plain-accent-2">
                      <ShieldOutlined />
                      <small>pin</small>
                    </button>
                    <HideReply
                      replyId={data.id}
                      hidden={hidden}
                      setHidden={setHidden}
                    />
                  </>
                )}
              </div>
              {replying && (
                <>
                  <hr className="mb-1" />
                  <ReplyForm
                    postId={data.postId}
                    parentId={data.id}
                    onSuccess={(_submissionData, submissionResult) => {
                      setReplying(false);
                      addNewReply(submissionResult as Reply);
                    }}
                  />
                </>
              )}
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
                    isMod={isMod}
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

export function NullParentReplies({
  data,
  isMod,
}: {
  data: Reply;
  isMod: boolean;
}) {
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
        <Reply
          data={child}
          shaded={false}
          firstLevel={true}
          isMod={isMod}
          key={child.id}
        />
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
