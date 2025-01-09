import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import { type UserData } from "../../types";
import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";

export function AccountForm() {
  const { user, changeUsername } = useOutletContext<{
    user: UserData;
    changeUsername: (username: string) => void;
  }>();
  return (
    <Form
      destination={{ endpoint: "/me", method: "PUT" }}
      onSuccess={(submissionData) => {
        toast(<p>Account changes successfully saved.</p>, {
          type: "success",
          className: "custom-toast",
        });
        changeUsername(submissionData.username);
      }}
      buttonText="Submit"
    >
      <label htmlFor="username">
        <span>Username</span>
        <InputChecklist
          input={
            <input
              type="text"
              id="username"
              autoComplete="off"
              defaultValue={user ? user.username : ""}
              maxLength={32}
              required
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

      <label htmlFor="bio">
        <span>Bio</span>
        <textarea id="bio" defaultValue={user.bio} maxLength={200} />
      </label>

      {!user.githubId && (
        <>
          <h3 className="mt-1">Password</h3>
          <p className="mb-1">
            Leave these fields blank if you do not wish to alter your password.
          </p>
        </>
      )}

      {!user.githubId && (
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
      )}

      {!user.githubId && (
        <label htmlFor="confirmPassword">
          <span>Confirm new password</span>
          <input type="password" id="confirmPassword" />
        </label>
      )}

      {!user.githubId && (
        <label htmlFor="currentPassword">
          <span>Current password</span>
          <input type="password" id="currentPassword" />
        </label>
      )}

      {/* 
      separate and not in one fragment, because the Form component only transforms labels at the first level... 
      */}
    </Form>
  );
}
