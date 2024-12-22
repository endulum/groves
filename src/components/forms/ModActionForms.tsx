import { ShieldOutlined, Loop } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function HideReply({
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
      // setHidden(submissionData.hidden === "true");
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

export function FreezePost({
  postId,
  readonly,
  setReadonly,
}: {
  postId: string;
  readonly: boolean;
  setReadonly: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/post/${postId}/status`, method: "PUT" },
    (submissionData, _submissionResult) => {
      toast(
        <p>
          Post has has been{" "}
          {submissionData.readonly === "false" ? "unfrozen" : ""}
          {submissionData.readonly === "true" ? "frozen" : ""}.
        </p>,
        {
          className: "custom-toast",
          type: "success",
        }
      );
      setReadonly(submissionData.readonly === "true");
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't freeze this post: {error}</p>, {
        className: "custom-toast",
        type: "error",
      });
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="button plain secondary"
        id="readonly"
        value={readonly ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{readonly ? "unfreeze" : "freeze"}</small>
      </button>
    </form>
  );
}
