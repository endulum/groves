import { useBoolean } from "usehooks-ts";

import {
  type Reply,
  type VisibleReply,
  type HiddenReply,
} from "../../../types";
import { useReplyChildren } from "../../../hooks/useReplyChildren";
import { CollapsibleReplyWrapper } from "./CollapsibleReplyWrapper";
import { Alert } from "../../reusable/Alert";
import { MDWrapper } from "../../reusable/MDWrapper";
import { ReplyActionRow } from "./ReplyActionRow";

export function Reply({
  data,
  isTopLevel,
}: {
  data: VisibleReply | HiddenReply;
  isTopLevel: boolean;
}) {
  const {
    value: hidden,
    setTrue: hide,
    setFalse: unhide,
  } = useBoolean(data.hidden);

  const {
    loading,
    children,
    countChildren,
    addNewChild,
    loadChildren,
    loadMoreChildren,
    setNextUrl,
  } = useReplyChildren(data);

  return (
    <div className="reply" id={data.id}>
      <CollapsibleReplyWrapper
        data={data}
        hidden={hidden}
        childrenCount={countChildren()}
      >
        {import.meta.env.MODE === "development" && <pre>{data.id}</pre>}

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

        <ReplyActionRow
          data={data}
          hiding={{
            hide,
            unhide,
            hidden,
          }}
          addNewChild={addNewChild}
          isTopLevel={isTopLevel}
        />

        {loadChildren && (
          <button
            className="button plain secondary reply-loadmore mt-1"
            onClick={() => {
              setNextUrl(loadChildren);
            }}
            disabled={loading}
          >
            <small>{loading ? "Loading..." : "Load replies to this"}</small>
          </button>
        )}

        {children.length > 0 && (
          <>
            <div className="reply-children flex-col align-start gap-0-5 mt-1">
              {children.map((child) => (
                <Reply
                  data={child as VisibleReply | HiddenReply}
                  isTopLevel={false}
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
      </CollapsibleReplyWrapper>
    </div>
  );
}
