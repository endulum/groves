import { useBoolean } from "usehooks-ts";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import { type VisibleReply, type HiddenReply } from "../../types";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function CollapsibleReplyWrapper({
  data,
  hidden,
  childrenCount,
  children,
}: {
  data: VisibleReply | HiddenReply;
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
      {!collapsed && <div className="reply-body">{children}</div>}
    </>
  );
}
