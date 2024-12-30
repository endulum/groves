import { useBoolean } from "usehooks-ts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
  VisibleReply,
  type Reply,
  type ReplyComponentContext,
} from "../../types";
import { ReplyForm } from "./ReplyForm";
import { FlyoutMenu } from "../FlyoutMenu";
import { VoteWidget } from "../VoteWidget";
import { HideReply } from "../forms/ModActionForms";

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
      {/* replying */}
      {replying && (
        <>
          <hr className="mb-1 mt-1" />
          <ReplyForm
            postId={data.postId}
            parentId={data.id}
            onSuccess={(_submissionData, submissionResult) => {
              toast(<p>New reply successfully created.</p>, {
                type: "success",
                className: "custom-toast",
              });
              cancelReplying();
              addNewChild(submissionResult as Reply);
            }}
          />
        </>
      )}

      {/* everything else */}
      <div className="flex-row gap-0-5 mt-0-5">
        {!hiding.hidden &&
          !data.hidden &&
          !context.isPostReadonly &&
          !context.isCommReadonly && (
            <VoteWidget
              data={data as VisibleReply}
              type="reply"
              isReadonly={context.isPostReadonly || context.isCommReadonly}
              context={context}
            />
          )}
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
        <FlyoutMenu x="left" y="top">
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

          {!context.isPostReadonly &&
            !context.isCommReadonly &&
            context.isMod && (
              <HideReply replyId={data.id} hideActions={hiding} />
            )}
        </FlyoutMenu>
      </div>
    </>
  );
}
