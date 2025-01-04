import { Loop, ShieldOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useForm } from "../../../hooks/useForm";

export function HideReplyButton({
  replyId,
  hideActions,
}: {
  replyId: string;
  hideActions: {
    hidden: boolean;
    hide: () => void;
    unhide: () => void;
  };
}) {
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/reply/${replyId}/status`, method: "PUT" },
    (submissionData, _submissionResult) => {
      toast(
        <p>
          Reply has has been{" "}
          {submissionData.hidden === "false" ? "unhidden" : ""}
          {submissionData.hidden === "true" ? "hidden" : ""}.
        </p>,
        {
          className: "custom-toast",
          type: "success",
        }
      );
      if (submissionData.hidden === "true") hideActions.hide();
      if (submissionData.hidden === "false") hideActions.unhide();
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't hide this reply: {error}</p>, {
        className: "custom-toast",
        type: "warning",
      });
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="button plain secondary"
        id="hidden"
        value={hideActions.hidden ? "false" : "true"}
      >
        <small>{hideActions.hidden ? "unhide" : "hide"}</small>
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}
      </button>
    </form>
  );
}
