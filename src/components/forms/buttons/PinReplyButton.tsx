import { useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, PushPin } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";

export function PinReplyButton({
  replyId,
  pinActions,
}: {
  replyId: string;
  pinActions: {
    pinned: boolean;
    pin: () => void;
    unpin: () => void;
  };
}) {
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/reply/${replyId}/pin`, method: "PUT" },
    (submissionData, _submissionResult) => {
      toast(
        <p>
          Reply has has been {submissionData.pin === "false" ? "unpinned" : ""}
          {submissionData.pin === "true" ? "pinned" : ""}.
        </p>,
        {
          className: "custom-toast",
          type: "success",
        }
      );
      if (submissionData.pin === "true") pinActions.pin();
      if (submissionData.pin === "false") pinActions.unpin();
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't pin this reply: {error}</p>, {
        className: "custom-toast",
        type: "warning",
      });
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="button plain secondary"
        id="pin"
        value={pinActions.pinned ? "false" : "true"}
      >
        <small>{pinActions.pinned ? "unpin" : "pin"}</small>
        {loading ? <Loop className="spin" /> : <PushPin />}
      </button>
    </form>
  );
}
