import { ShieldOutlined, Loop } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function HideReply({
  replyId,
  hidden,
  setHidden,
}: {
  replyId: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
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
      setHidden(submissionData.hidden === "true");
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>{error}</p>, {
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
        value={hidden ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{hidden ? "unhide" : "hide"}</small>
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
      toast(<p>{error}</p>, {
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
