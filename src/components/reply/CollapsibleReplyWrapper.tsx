import { useBoolean } from "usehooks-ts";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import {
  type VisibleReply,
  type HiddenReply,
  type ReplyComponentContext,
} from "../../types";
import { Username } from "../Username";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function CollapsibleReplyWrapper({
  data,
  context,
  hidden,
  childrenCount,
  children,
}: {
  data: VisibleReply | HiddenReply;
  context: ReplyComponentContext;
  hidden: boolean;
  childrenCount: number;
  children: React.ReactNode;
}) {
  const {
    value: collapsed,
    setTrue: collapse,
    setFalse: expand,
  } = useBoolean(false);

  return (
    <>
      {collapsed ? (
        <button
          className="button plain reply-collapse collapsed"
          title="Hide reply tree"
          onClick={expand}
        >
          <ExpandMore />
        </button>
      ) : (
        <button
          className="button plain reply-collapse expanded"
          title="Hide reply tree"
          onClick={collapse}
        >
          <ExpandLess />
        </button>
      )}
      <div className="reply-top">
        {collapsed ? (
          <>
            <small>
              {hidden && <i>hidden content,</i>}
              {!hidden && data.hidden && <i>unhidden content,</i>}
              {!hidden && !data.hidden && (
                <>
                  <Username
                    user={data.author}
                    role={
                      context.isReplyAuthorAdmin
                        ? "admin"
                        : context.isReplyAuthorMod
                        ? "mod"
                        : data.author.id === context.postAuthorID
                        ? "op"
                        : null
                    }
                  />{" "}
                  {/* <Link to={`/user/${data.author.username}`}>
                    {data.author.username}
                  </Link>{" "} */}
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
              {childrenCount} children
            </small>
          </>
        ) : (
          <>
            <small>
              {hidden && <i>hidden content</i>}
              {!hidden && data.hidden && <i>unhidden content</i>}
              {!hidden && !data.hidden && (
                <>
                  {/* <Link to={`/user/${data.author.username}`}>
                    {data.author.username}
                  </Link>{" "} */}
                  <Username
                    user={data.author}
                    role={
                      context.isReplyAuthorAdmin
                        ? "admin"
                        : context.isReplyAuthorMod
                        ? "mod"
                        : data.author.id === context.postAuthorID
                        ? "op"
                        : null
                    }
                  />{" "}
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
      {!collapsed && <div className="reply-body">{children}</div>}
    </>
  );
}
