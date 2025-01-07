import { useBoolean } from "usehooks-ts";
import { Link, useOutletContext } from "react-router-dom";

import { type User, type Reply, type VisibleReply } from "../../../types";
import { ReplyForm } from "../../forms/ReplyForm";
import { VoteWidget } from "../../reusable/VoteWidget";
import { FlyoutMenu } from "../../reusable/FlyoutMenu";
import { HideReplyButton } from "../../forms/buttons/HideReplyButton";
import { PinReplyButton } from "../../forms/buttons/PinReplyButton";
import { useContext } from "react";
import { PostContext } from "../post/PostContext";

export function ReplyActionRow({
  data,
  hiding,
  isTopLevel,
  addNewChild,
}: {
  data: Reply | VisibleReply;
  hiding: {
    hidden: boolean;
    hide: () => void;
    unhide: () => void;
  };
  isTopLevel: boolean;
  addNewChild: (reply: Reply) => void;
}) {
  const { user } = useOutletContext<{ user: User }>();
  const {
    data: postData,
    freezing,
    isolateReplyID,
    getRole,
    pinnedReply,
  } = useContext(PostContext);
  const {
    value: replying,
    setTrue: openReplying,
    setFalse: cancelReplying,
  } = useBoolean(false);

  const frozen = postData.community.readonly || freezing.frozen;
  const isolated = !!isolateReplyID && isolateReplyID === data.id;

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
          <VoteWidget data={data as VisibleReply} type="reply" />
        )}

        {/* replying or cancelling replying */}
        {user &&
          !frozen &&
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
            (isTopLevel ? (
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
          {!isolated && (
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
          {!frozen && getRole(user) !== null && (
            <HideReplyButton replyId={data.id} hideActions={hiding} />
          )}
          {/* pin reply */}
          {!frozen &&
            !hiding.hidden &&
            !data.hidden &&
            user &&
            // only the post op should be able to see pin settings
            postData.author.id === user.id &&
            // if there is a pinned reply then this should only show next to the pinned reply
            (!pinnedReply || pinnedReply.id === data.id) && (
              <PinReplyButton data={data as VisibleReply} />
            )}
        </FlyoutMenu>
      </div>
    </>
  );
}
