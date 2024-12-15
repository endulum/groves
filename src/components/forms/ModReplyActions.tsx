import { ShieldOutlined, Loop } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { type Reply } from "../../types";
import { useLogger } from "../../hooks/useLogger";

export function HideReply({
  replyId,
  hidden,
  setHidden,
}: {
  replyId: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { loading, error, inputErrors, handleSubmit } = useForm(
    { endpoint: `/reply/${replyId}/status`, method: "PUT" },
    (submissionData, _submissionResult) => {
      setHidden(submissionData.hidden === "true");
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="button plain-accent-2"
        id="hidden"
        value={hidden ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <ShieldOutlined />}

        <small>{hidden ? "unhide" : "hide"}</small>
      </button>
    </form>
  );
}
