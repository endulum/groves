import { Loop } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { type User } from "../../../types";
import { useForm } from "../../../hooks/useForm";

export function DemoteModeratorButton({
  username,
  communityUrl,
  demoteMod,
}: {
  username: string;
  communityUrl: string;
  demoteMod: (user: User) => void;
}) {
  const { loading, error, handleSubmit } = useForm<User>(
    { endpoint: `/community/${communityUrl}/moderators`, method: "PUT" },
    (_submissionData, submissionResult) => {
      toast(
        <p>
          <b>{submissionResult.username}</b> is no longer a moderator of this
          community.
        </p>,
        {
          type: "success",
          className: "custom-toast",
        }
      );
      demoteMod(submissionResult);
    }
  );

  useEffect(() => {
    if (error)
      toast(<p>Couldn't demote this moderator: {error}</p>, {
        className: "custom-toast",
        type: "warning",
      });
  }, [error]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type" style={{ display: "none" }} aria-hidden>
        <span>Type</span>
        <input id="type" autoComplete="off" defaultValue="demote" />
      </label>
      <button
        type="submit"
        id="username"
        value={username}
        className="button plain warning"
      >
        {loading && <Loop className="spin" />}
        <small>Demote</small>
      </button>
    </form>
  );
}
