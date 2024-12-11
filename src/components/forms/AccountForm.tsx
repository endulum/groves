import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { type User } from "../../types";
import { Form } from "../Form";
import { InputChecklist } from "../InputChecklist";
import { Alert } from "../Alert";

export function AccountForm() {
  const [success, setSuccess] = useState<boolean>(false);
  const { user, changeUsername } = useOutletContext<{
    user: User;
    changeUsername: (username: string) => void;
  }>();
  return (
    <Form
      destination={{ endpoint: "/me", method: "PUT" }}
      onClickSubmit={() => {
        setSuccess(false);
      }}
      onSuccess={(submissionData) => {
        setSuccess(true);
        changeUsername(submissionData.username);
      }}
      buttonText="Submit"
    >
      {success && (
        <Alert type="success">
          <p>Your changes have been saved.</p>
        </Alert>
      )}
      <label htmlFor="username">
        <span>Username</span>
        <InputChecklist
          input={
            <input
              type="text"
              id="username"
              autoComplete="off"
              defaultValue={user ? user.username : ""}
            />
          }
          requirements={[
            {
              description: "Must be between 2 and 32 characters in length",
              function: (x: string) => x.length >= 2 && x.length <= 32,
            },
            {
              description:
                "Must contain only lowercase letters, numbers, and hyphens",
              function: (x: string) => x.match(/^[a-z0-9-]+$/g) !== null,
            },
          ]}
        />
      </label>

      <label htmlFor="password">
        <span>New password</span>
        <InputChecklist
          input={<input type="password" id="password" autoComplete="off" />}
          requirements={[
            {
              description: "Must be 8 or more chatacters long",
              function: (x: string) => x.length >= 8,
            },
          ]}
        />
      </label>

      <label htmlFor="confirmPassword">
        <span>Confirm new password</span>
        <input type="password" id="confirmPassword" />
      </label>

      <label htmlFor="currentPassword">
        <span>Current password</span>
        <input type="password" id="currentPassword" />
      </label>
    </Form>
  );
}
