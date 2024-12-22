/* import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime, DateTimeFormatOptions } from "luxon";


import {
  type Reply,
  type VisibleReply,
  type HiddenReply,
  type ReplyStatus,
} from "../../types";
import { useGet } from "../../hooks/useGet";
import { VoteWidget } from ".././VoteWidget";
import { MDWrapper } from ".././MDWrapper";
import { ReplyForm } from "./ReplyForm";
import { CollapsedReply } from "./CollapsedReply";
import { ReplyActionRow } from "./ReplyActionRow";
import { Alert } from "../Alert";
import { gatherChildrenIds } from "../../functions/gatherChildrenIds";


*/

import { useBoolean } from "usehooks-ts";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import {
  type ReplyStatus,
  type Reply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { MDWrapper } from "../MDWrapper";
import { useReplyChildren } from "../../hooks/useReplyChildren";
import { ReplyActionRow } from "./ReplyActionRow";
import { ReplyForm } from "./ReplyForm";
import { Alert } from "../Alert";
import { gatherChildrenIds } from "../../functions/gatherChildrenIds";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function Reply({
  data,
  status,
}: {
  data: VisibleReply | HiddenReply;
  status: ReplyStatus;
}) {
  const {
    value: collapsed,
    setTrue: collapse,
    setFalse: expand,
  } = useBoolean(false);

  const {
    value: replying,
    setTrue: openReplying,
    setFalse: cancelReplying,
  } = useBoolean(false);

  const {
    value: hidden,
    setTrue: hide,
    setFalse: unhide,
  } = useBoolean(data.hidden);

  const {
    loading,
    children,
    addNewChild,
    loadChildren,
    loadMoreChildren,
    setNextUrl,
  } = useReplyChildren(data);

  return (
    <div className={"reply"} id={data.id}>
      <div className="reply-top">
        {collapsed ? (
          <>
            <button
              className="button plain reply-collapse collapsed"
              title="Hide reply tree"
              onClick={expand}
            >
              <ExpandMore />
            </button>
            <small>
              {hidden && <i>hidden content,</i>}
              {!hidden && data.hidden && <i>unhidden content,</i>}
              {!hidden && !data.hidden && (
                <>
                  <Link to={`/user/${data.author.username}`}>
                    {data.author.username}
                  </Link>{" "}
                  replied{" "}
                  <span
                    title={DateTime.fromISO(data.datePosted).toLocaleString(
                      format
                    )}
                  >
                    {DateTime.fromISO(data.datePosted).toRelative()}
                  </span>{" "}
                  with{" "}
                  <span>
                    {data._count.upvotes - data._count.downvotes} points,
                  </span>
                </>
              )}{" "}
              {gatherChildrenIds(children).length} children
            </small>
          </>
        ) : (
          <>
            <button
              className="button plain reply-collapse expanded"
              title="Hide reply tree"
              onClick={collapse}
            >
              <ExpandLess />
            </button>
            <small>
              {hidden && <i>hidden content</i>}
              {!hidden && data.hidden && <i>unhidden content</i>}
              {!hidden && !data.hidden && (
                <>
                  <Link to={`/user/${data.author.username}`}>
                    {data.author.username}
                  </Link>{" "}
                  replied{" "}
                  <span
                    title={DateTime.fromISO(data.datePosted).toLocaleString(
                      format
                    )}
                  >
                    {DateTime.fromISO(data.datePosted).toRelative()}
                  </span>
                </>
              )}
            </small>
          </>
        )}
      </div>
      {!collapsed && (
        <div className="reply-body">
          {hidden && (
            <Alert type="blind">
              <p>This reply's content is hidden.</p>
            </Alert>
          )}
          {!hidden && data.hidden && (
            <Alert type="info">
              <p>
                This reply was unhidden. Its content will be visible on the next
                content load.
              </p>
            </Alert>
          )}
          {!hidden && !data.hidden && <MDWrapper content={data.content} />}

          {replying && (
            <>
              <hr className="mb-1 mt-1" />
              <ReplyForm
                postId={data.postId}
                parentId={data.id}
                onSuccess={(_submissionData, submissionResult) => {
                  cancelReplying();
                  addNewChild(submissionResult as Reply);
                }}
              />
            </>
          )}

          <ReplyActionRow
            data={data}
            status={status}
            replyActions={{ replying, cancelReplying, openReplying }}
            hideActions={{ hidden, hide, unhide }}
          />

          {loadChildren && (
            <button
              className="button plain secondary reply-loadmore mt-1"
              onClick={() => {
                setNextUrl(loadChildren);
              }}
              disabled={loading}
            >
              <small>{loading ? "Loading..." : "Load replies"}</small>
            </button>
          )}

          {children.length > 0 && (
            <>
              <div className="reply-children flex-col align-start gap-0-5 mt-1">
                {children.map((child) => (
                  <Reply
                    data={child as VisibleReply | HiddenReply}
                    status={{
                      ...status,
                      isTopLevel: false,
                    }}
                    key={child.id}
                  />
                ))}
              </div>
              {loadMoreChildren && (
                <button
                  onClick={() => {
                    setNextUrl(loadMoreChildren);
                  }}
                  className="button plain secondary reply-loadmore mt-1"
                  disabled={loading}
                >
                  <small>{loading ? "Loading..." : "Load more replies"}</small>
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/*

export function Reply({
  data,
  status,
}: {
  data: VisibleReply | HiddenReply;
  status: ReplyStatus;
}) {
  const [loadMoreChildren, setLoadMoreChildren] = useState<string | null>(
    data.loadMoreChildren ?? null
  );
  const [loadChildren, setLoadChildren] = useState<string | null>(
    data.loadChildren ?? null
  );
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  // will hold a loadChildren or loadMoreChildren url

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);

  const [children, setChildren] = useState<Reply[]>(data.children ?? []);

  // closest we can do to updating hidden as a state, if we want to hide things on the fly
  const [hidden, setHidden] = useState<boolean>(data.hidden);

  const {
    loading,
    data: moreData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: Reply[];
  }>(nextUrl as string);

  // will fetch more children when nextUrl is set
  useEffect(() => {
    if (nextUrl) get(false);
  }, [nextUrl]);

  useEffect(() => {
    // will add moreData's children to current children when fetch is done
    if (moreData && nextUrl) {
      setChildren([...children, ...moreData.children]);
      setLoadChildren(moreData.loadChildren);
      setLoadMoreChildren(moreData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [moreData]);

  // if a new reply is written, the client should see it immediately, hence
  const addNewChild = (newChild: Reply) => {
    setChildren([newChild, ...children]);
  };

  return (
    <div
      className={`reply${status.isShaded ? " shaded" : ""}${
        status.isTopLevel ? " first-level" : ""
      }`}
      id={data.id}
    >
      {collapsed ? (
        <CollapsedReply
          data={data}
          hidden={hidden}
          setCollapsed={setCollapsed}
          childCount={gatherChildrenIds(children).length}
        />
      ) : (
        <>
          <button
            className="button reply-collapse expanded"
            title="Hide reply tree"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <ExpandLess />
          </button>

          <div className="reply-content flex-row gap-1 align-start">
            {hidden || (!hidden && data.hidden) ? (
              <div className="reply-body flex-col align-start">
                {hidden && (
                  <Alert type="blind">
                    <p>This reply's content is hidden.</p>
                  </Alert>
                )}
                {!hidden && data.hidden && (
                  <Alert type="info">
                    <p>
                      This reply was unhidden. Its content will be visible on
                      the next render.
                    </p>
                  </Alert>
                )}
                {import.meta.env.MODE === "development" &&
                  import.meta.env.HIDE_TEXT === "true" && (
                    <pre className="mt-1">{data.id}</pre>
                  )}
                <ReplyActionRow
                  data={data}
                  status={status}
                  hidden={hidden}
                  setHidden={setHidden}
                  replying={replying}
                  setReplying={setReplying}
                />
                {loadChildren && (
                  <small className="reply-loadmore mt-0-5 mb-0-5">
                    {loading ? (
                      <span>Loading replies...</span>
                    ) : (
                      <a
                        onClick={() => {
                          setNextUrl(loadChildren);
                        }}
                        title={loadChildren}
                      >
                        Load replies
                      </a>
                    )}
                  </small>
                )}
              </div>
            ) : (
              !data.hidden && (
                <>
                  <VoteWidget
                    data={data}
                    type="reply"
                    canVote={data.canVote}
                    orientation="vertical"
                  />
                  <div className="reply-body flex-col align-start">
                    <small>
                      <Link to={`/user/${data.author.username}`}>
                        {data.author.username}
                      </Link>{" "}
                      replied{" "}
                      <span
                        title={DateTime.fromISO(data.datePosted).toLocaleString(
                          format
                        )}
                      >
                        {DateTime.fromISO(data.datePosted).toRelative()}
                      </span>
                    </small>

                    {import.meta.env.MODE === "development" &&
                    import.meta.env.HIDE_TEXT === "true" ? (
                      <pre className="mt-1">{data.id}</pre>
                    ) : (
                      <MDWrapper content={data.content} />
                    )}

                    <ReplyActionRow
                      data={data}
                      status={status}
                      hidden={hidden}
                      setHidden={setHidden}
                      replying={replying}
                      setReplying={setReplying}
                    />

                    {replying && (
                      <>
                        <hr className="mb-1 mt-1" />
                        <ReplyForm
                          postId={data.postId}
                          parentId={data.id}
                          onSuccess={(_submissionData, submissionResult) => {
                            setReplying(false);
                            addNewChild(submissionResult as Reply);
                          }}
                        />
                      </>
                    )}
                    {loadChildren && (
                      <small className="reply-loadmore mt-0-5 mb-0-5">
                        {loading ? (
                          <span>Loading replies...</span>
                        ) : (
                          <a
                            onClick={() => {
                              setNextUrl(loadChildren);
                            }}
                            title={loadChildren}
                          >
                            Load replies
                          </a>
                        )}
                      </small>
                    )}
                  </div>
                </>
              )
            )}
          </div>
          {children.length > 0 && (
            <>
              <div className="reply-children flex-col align-start gap-0-5 mt-1">
                {children.map((child) => (
                  <Reply
                    data={child as VisibleReply | HiddenReply}
                    status={{
                      ...status,
                      isShaded: !status.isShaded,
                      isTopLevel: false,
                    }}
                    key={child.id}
                  />
                ))}
              </div>
              {loadMoreChildren && (
                <small className="reply-loadmore mt-1 mb-0-5">
                  {loading ? (
                    <span>Loading more replies...</span>
                  ) : (
                    <a
                      onClick={() => {
                        setNextUrl(loadMoreChildren);
                      }}
                      title={loadMoreChildren}
                    >
                      Load more replies
                    </a>
                  )}
                </small>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
 */
