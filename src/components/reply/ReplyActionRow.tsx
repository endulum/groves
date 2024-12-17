import { Link } from "react-router-dom";

import { type Reply, type ReplyStatus } from "../../types";
import { HideReply } from "../forms/ModReplyActions";

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
      {/* parent */}
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

      {/* isolate */}
      {!(status.replyParam && status.replyParam === data.id) && (
        <Link
          type="button"
          className="button plain secondary"
          to={`/post/${data.postId}/reply/${data.id}`}
          title="View this post on its own"
        >
          <small>isolate</small>
        </Link>
      )}

      {/* reply */}
      {!hidden &&
        status.isLoggedIn &&
        !status.isReadOnly &&
        (replying ? (
          <button
            type="button"
            className="button plain secondary"
            onClick={() => setReplying(false)}
          >
            <small style={{ color: "crimson" }}>cancel replying</small>
          </button>
        ) : (
          <button
            type="button"
            className="button plain secondary"
            onClick={() => setReplying(true)}
          >
            <small>reply</small>
          </button>
        ))}

      {/* mod actions */}
      {status.isMod && (
        <>
          <HideReply replyId={data.id} hidden={hidden} setHidden={setHidden} />
        </>
      )}
    </div>
  );
}
