/* import { Link } from "react-router-dom";

import { type Reply, type ReplyStatus } from "../../types";
import { HideReply } from "../forms/ModActionForms";
*/

import { Link } from "react-router-dom";

import { type ReplyStatus, type Reply, VisibleReply } from "../../types";
import { HideReply } from "../forms/ModActionForms";
import { VoteWidget } from "../VoteWidget";
import { FlyoutMenu } from "../FlyoutMenu";

export function ReplyActionRow({
  data,
  status,
  replyActions,
  hideActions,
}: {
  data: Reply;
  status: ReplyStatus;
  replyActions: {
    replying: boolean;
    cancelReplying: () => void;
    openReplying: () => void;
  };
  hideActions: {
    hidden: boolean;
    hide: () => void;
    unhide: () => void;
  };
}) {
  return (
    <div className="flex-row gap-0-5 mt-0-5">
      {/* vote */}
      {!hideActions.hidden && !status.isReadOnly && (
        <VoteWidget
          data={data as VisibleReply}
          type="reply"
          canVote={data.canVote}
          orientation="horizontal"
        />
      )}
      {status.isLoggedIn &&
        !status.isReadOnly &&
        !hideActions.hidden &&
        (replyActions.replying ? (
          <button
            type="button"
            className="button plain secondary"
            onClick={replyActions.cancelReplying}
          >
            <small style={{ color: "crimson" }}>cancel replying</small>
          </button>
        ) : (
          <button
            type="button"
            className="button plain secondary"
            onClick={replyActions.openReplying}
          >
            <small>reply</small>
          </button>
        ))}
      <FlyoutMenu x="left" y="top">
        {data.parentId &&
          (status.isTopLevel ? (
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

        {!(
          status.currentIsolatedReply && status.currentIsolatedReply === data.id
        ) && (
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

        {!status.isReadOnly && status.isMod && (
          <HideReply replyId={data.id} hideActions={hideActions} />
        )}
      </FlyoutMenu>
    </div>
  );
}

/*
export function ReplyActionRow({
  data,
  status,
  replying,
  setReplying,
  hidden,
  setHidden,
}: {
  data: Reply;
  status: ReplyStatus;
  replying: boolean;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="reply-linkrow mt-0-5 flex-row gap-0-5">
      

      

      {!hidden &&
        status.isLoggedIn &&
        !status.isReadOnly &&
        }

      {!status.isReadOnly && status.isMod && (
        <>
          <HideReply replyId={data.id} hidden={hidden} setHidden={setHidden} />
        </>
      )}
    </div>
  );
}
 */
