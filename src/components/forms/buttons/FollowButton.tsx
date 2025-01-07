import { useEffect } from "react";
import { toast } from "react-toastify";
import { Loop, PersonAdd, PersonRemove } from "@mui/icons-material";

import { Community } from "../../../types";
import { useForm } from "../../../hooks/useForm";
import { useBoolean } from "usehooks-ts";

export function FollowButton({
  data,
  followers,
  setFollowers,
}: {
  data: Community;
  followers: number;
  setFollowers: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    value: isFollowing,
    setFalse: unfollow,
    setTrue: follow,
  } = useBoolean(data.meta.isFollowing);

  const { loading, error, handleSubmit } = useForm(
    { endpoint: `/community/${data.id}/followers`, method: "PUT" },
    (submissionData, _submissionResult) => {
      if (submissionData.follow === "true") {
        follow();
        setFollowers(followers + 1);
        toast(
          <p>
            You are now following <b>{data.canonicalName}</b>.
          </p>,
          {
            className: "custom-toast",
            type: "success",
          }
        );
      }
      if (submissionData.follow === "false") {
        unfollow();
        setFollowers(followers - 1);
        toast(
          <p>
            You are no longer following <b>{data.canonicalName}</b>.
          </p>,
          {
            className: "custom-toast",
            type: "success",
          }
        );
      }
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
        className="button primary"
        id="follow"
        value={isFollowing ? "false" : "true"}
      >
        {loading ? (
          <Loop className="spin" />
        ) : isFollowing ? (
          <PersonRemove />
        ) : (
          <PersonAdd />
        )}
        <span>{isFollowing ? "Unfollow" : "Follow"}</span>
      </button>
    </form>
  );
}
