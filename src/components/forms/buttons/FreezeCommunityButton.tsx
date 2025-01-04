import { toast } from "react-toastify";
import { useEffect } from "react";
import { Loop, AcUnit } from "@mui/icons-material";

import { type Community } from "../../../types";
import { useForm } from "../../../hooks/useForm";

export function FreezeCommunityButton({
  community,
  get,
}: {
  community: Community;
  get: () => Promise<void>;
}) {
  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/community/${community.id}/status`, method: "PUT" },
    (submissionData, _submissionResult) => {
      toast(
        <p>
          This community has been{" "}
          {submissionData.readonly === "false" ? "unfrozen" : ""}
          {submissionData.readonly === "true" ? "frozen" : ""}.
        </p>,
        {
          className: "custom-toast",
          type: "success",
        }
      );
      get();
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't freeze this community: {error}</p>, {
        className: "custom-toast",
        type: "error",
      });
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="button primary"
        id="readonly"
        value={community.readonly ? "false" : "true"}
      >
        {loading ? <Loop className="spin" /> : <AcUnit />}

        <span>{community.readonly ? "Unfreeze" : "Freeze"}</span>
      </button>
    </form>
  );
}
