import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, ShieldOutlined } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";
import { PostContext } from "../../unique/post/PostContext";

export function PinPostButton() {
  const { data, pinning } = useContext(PostContext);
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/post/${data.id}/pin`, method: "PUT" },
    (submissionData, _submissionResult) => {
      toast(
        <p>
          Post has has been {submissionData.pin === "false" ? "unpinned" : ""}
          {submissionData.pin === "true" ? "pinned" : ""}.
        </p>,
        {
          className: "custom-toast",
          type: "success",
        }
      );
      if (submissionData.pin === "true") pinning.pin();
      if (submissionData.pin === "false") pinning.unpin();
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't pin this post: {error}</p>, {
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
        value={pinning.pinned ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{pinning.pinned ? "unpin" : "pin"}</small>
      </button>
    </form>
  );
}
