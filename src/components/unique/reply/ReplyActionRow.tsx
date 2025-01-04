import { useBoolean } from "usehooks-ts";
import { Link } from "react-router-dom";

import {
  type Reply,
  type VisibleReply,
  type ReplyComponentContext,
} from "../../../types";
import { ReplyForm } from "../../forms/ReplyForm";
import { VoteWidget } from "../../reusable/VoteWidget";
import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { HideReplyButton } from "../../forms/buttons/HideReplyButton";

export function ReplyActionRow({
  data,
  context,
  hiding,
  addNewChild,
}: {
  data: Reply;
  context: ReplyComponentContext;
  hiding: {
    hidden: boolean;
    hide: () => void;
    unhide: () => void;
  };
  addNewChild: (reply: Reply) => void;
}) {
  const {
    value: replying,
    setTrue: openReplying,
    setFalse: cancelReplying,
  } = useBoolean(false);

  return (
    <>
      {/* the reply form */}
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

      {/* the action row */}
      <div className="flex-row gap-0-5 mt-0-5">
        {/* voting */}
        {!hiding.hidden && !data.hidden && (
          <VoteWidget
            data={data as VisibleReply}
            type="reply"
            isReadonly={context.isPostReadonly || context.isCommReadonly}
            context={context}
          />
        )}

        {/* replying or cancelling replying */}
        {context.authUserID !== null &&
          !context.isPostReadonly &&
          !context.isCommReadonly &&
          !hiding.hidden &&
          (replying ? (
            <button
              type="button"
              className="button plain secondary"
              onClick={cancelReplying}
            >
              <small style={{ color: "crimson" }}>cancel replying</small>
            </button>
          ) : (
            <button
              type="button"
              className="button plain secondary"
              onClick={openReplying}
            >
              <small>reply</small>
            </button>
          ))}

        {/* flyout menu */}
        <FlyoutMenu x="left" y="top">
          {/* link to, or jump to, parent */}
          {data.parentId &&
            (context.isTopLevel ? (
              <Link
                type="button"
                className="button plain secondary"
                to={`/post/${data.postId}/reply/${data.parentId}`}
                title="Go to the parent of this post"
              >
                <small>parent</small>
              </Link>
            ) : (
              <a
                type="button"
                className="button plain secondary"
                href={`#${data.parentId}`}
                title="Jump to the parent of this post"
              >
                <small>parent</small>
              </a>
            ))}

          {/* link to render this reply in isolation in ReplyView */}
          {!(context.isolateReplyID && context.isolateReplyID === data.id) && (
            // don't show the isolate link if we're already isolating this reply
            <Link
              type="button"
              className="button plain secondary"
              to={`/post/${data.postId}/reply/${data.id}`}
              title="View this post on its own"
            >
              <small>isolate</small>
            </Link>
          )}

          {/* hide reply */}
          {!context.isPostReadonly &&
            !context.isCommReadonly &&
            context.isMod && (
              <HideReplyButton replyId={data.id} hideActions={hiding} />
            )}
        </FlyoutMenu>
      </div>
    </>
  );
}
