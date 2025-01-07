import { useBoolean } from "usehooks-ts";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import { DateWithTitle } from "../../reusable/DateWithTitle";

import { type VisibleReply, type HiddenReply } from "../../../types";
import { Username } from "../../reusable/Username";
import { useContext } from "react";
import { PostContext } from "../post/PostContext";

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
  const { data: postData, getRole } = useContext(PostContext);

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
          title="Expand reply tree"
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
                      getRole(data.author) ??
                      data.author.id === postData.author.id
                        ? "op"
                        : null
                    }
                  />{" "}
                  replied <DateWithTitle dateString={data.datePosted} /> with{" "}
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
                  <Username
                    user={data.author}
                    role={
                      getRole(data.author) ??
                      data.author.id === postData.author.id
                        ? "op"
                        : null
                    }
                  />{" "}
                  replied <DateWithTitle dateString={data.datePosted} />
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
