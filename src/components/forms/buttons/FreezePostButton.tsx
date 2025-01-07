import { useContext, useEffect } from "react";
import { PostContext } from "../../unique/post/PostContext";
import { toast } from "react-toastify";
import { Loop, ShieldOutlined } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";

export function FreezePostButton() {
  const { data, freezing } = useContext(PostContext);

  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/post/${data.id}/status`, method: "PUT" },
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
      if (submissionData.readonly === "true") freezing.freeze();
      if (submissionData.readonly === "false") freezing.unfreeze();
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
        value={freezing.frozen ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{freezing.frozen ? "unfreeze" : "freeze"}</small>
      </button>
    </form>
  );
}
