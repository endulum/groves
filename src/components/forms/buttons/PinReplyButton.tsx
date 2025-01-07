import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, PushPin } from "@mui/icons-material";

import { useForm } from "../../../hooks/useForm";
import { PostContext } from "../../unique/post/PostContext";
import { type VisibleReply } from "../../../types";

export function PinReplyButton({ data }: { data: VisibleReply }) {
  const { pinning, pinnedReply, setPinnedReply } = useContext(PostContext);
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/reply/${data.id}/pin`, method: "PUT" },
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
      if (submissionData.pin === "true") {
        pinning.pin();
        setPinnedReply({
          id: data.id,
          author: data.author,
          datePosted: data.datePosted,
          content: data.content,
          _count: data._count,
        });
      }
      if (submissionData.pin === "false") {
        pinning.unpin();
        setPinnedReply(null);
      }
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
        value={pinnedReply ? "false" : "true"}
      >
        <small>{pinnedReply ? "unpin" : "pin"}</small>
        {loading ? <Loop className="spin" /> : <PushPin />}
      </button>
    </form>
  );
}
