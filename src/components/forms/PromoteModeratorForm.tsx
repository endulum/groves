import { toast } from "react-toastify";

import { type Community, type User } from "../../types";
import { Form } from "../reusable/Form";

export function PromoteModeratorForm({
  community,
  promoteMod,
}: {
  community: Community;
  promoteMod: (user: User) => void;
}) {
  return (
    <Form<User>
      destination={{
        method: "PUT",
        endpoint: `/community/${community.urlName}/moderators`,
      }}
      onSuccess={(_submissionData, submissionResult) => {
        toast(
          <p>
            <b>{submissionResult.username}</b> has been added as a moderator of
            this community.
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
        Enter a username to grant moderation privileges to that user. The user
        must exist, and not already be a moderator.
      </p>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" required />
      </label>
      <label htmlFor="type" style={{ display: "none" }} aria-hidden>
        <span>Type</span>
        <input id="type" autoComplete="off" defaultValue="promote" />
      </label>
    </Form>
  );
}
