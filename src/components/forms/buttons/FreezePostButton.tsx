import { useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, ShieldOutlined } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";

export function FreezePostButton({
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
        type: "warning",
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
