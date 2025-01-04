import { toast } from "react-toastify";

import { type Community, type User } from "../../types";
import { Form } from "../reusable/Form";

export function ChangeAdminForm({
  community,
  get,
}: {
  community: Community;
  get: () => Promise<void>;
}) {
  return (
    <Form<User>
      destination={{
        method: "PUT",
        endpoint: `/community/${community.urlName}/admin`,
      }}
      onSuccess={(_submissionData, submissionResult) => {
        toast(
          <p>
            <b>{submissionResult.username}</b> is now admin of this community.
          </p>,
          {
            type: "success",
            className: "custom-toast",
          }
        );
        get();
      }}
      buttonText="Promote"
    >
      <p>
        Enter a username to grant admin privileges to that user. You will no
        longer be admin of this community.
      </p>
      <label htmlFor="username">
        <span>Username</span>
        <input type="text" id="username" />
      </label>
    </Form>
  );
}
