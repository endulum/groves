import { ShieldOutlined, Loop } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";

export function HideReply({
  replyId,
  hidden,
  setHidden,
}: {
  replyId: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { loading, handleSubmit } = useForm(
    { endpoint: `/reply/${replyId}/status`, method: "PUT" },
    (submissionData, _submissionResult) => {
      setHidden(submissionData.hidden === "true");
    }
  );

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
