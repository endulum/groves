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
