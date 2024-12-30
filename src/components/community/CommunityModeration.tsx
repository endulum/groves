import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Loop } from "@mui/icons-material";

import { type User, type Community } from "../../types";
import { Username } from "../Username";
import { Form } from "../Form";

import { useForm } from "../../hooks/useForm";

export function CommunityModeration() {
  const { user, community, moderators, promoteMod, demoteMod } =
    useOutletContext<{
      user: User | null;
      community: Community;
      moderators: User[];
      promoteMod: (user: User) => void;
      demoteMod: (user: User) => void;
    }>();

  return (
    <>
      <h3 className="mb-1">Current moderators</h3>
      <ul className="flex-col align-start">
        {moderators.length > 0 ? (
          moderators.map((mod) => (
            <li className="flex-row gap-0-5" key={mod.id}>
              <Username user={mod} role="mod" />
              {user && user.id === community.admin.id && (
                <DemoteMod
                  username={mod.username}
                  communityUrl={community.urlName}
                  demoteMod={demoteMod}
                />
              )}
            </li>
          ))
        ) : (
          <p>There are currently no moderators of this community.</p>
        )}
      </ul>

      {user && user.id === community.admin.id && (
        <>
          <h3 className="mt-1 mb-1">Promote a moderator</h3>
          <Form<User>
            destination={{
              method: "PUT",
              endpoint: `/community/${community.urlName}/moderators`,
            }}
            onSuccess={(_submissionData, submissionResult) => {
              toast(
                <p>
                  <b>{submissionResult.username}</b> has been added as a
                  moderator of this community.
                </p>,
                {
                  type: "success",
                  className: "custom-toast",
                }
              );
              promoteMod(submissionResult);
            }}
            buttonText="Promote"
          >
            <p>
              Enter a username to grant moderation privileges to that user. The
              user must exist, and not already be a moderator.
            </p>
            <label htmlFor="username">
              <span>Username</span>
              <input type="text" id="username" />
            </label>
            <label htmlFor="type" style={{ display: "none" }} aria-hidden>
              <span>Type</span>
              <input id="type" autoComplete="off" defaultValue="promote" />
            </label>
          </Form>
        </>
      )}
    </>
  );
}

function DemoteMod({
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
        type: "error",
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
