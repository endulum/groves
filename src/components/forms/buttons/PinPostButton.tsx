import { useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, ShieldOutlined } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";

export function PinPostButton({
  postId,
  pinned,
  setPinned,
}: {
  postId: string;
  pinned: boolean;
  setPinned: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/post/${postId}/pin`, method: "PUT" },
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
      setPinned(submissionData.pin === "true");
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
        value={pinned ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{pinned ? "unpin" : "pin"}</small>
      </button>
    </form>
  );
}
