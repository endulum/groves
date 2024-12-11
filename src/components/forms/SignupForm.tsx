import { useState } from "react";
import { Link } from "react-router-dom";

import { Form } from "../Form";
import { InputChecklist } from "../InputChecklist";
import { Alert } from "../Alert";

export function SignupForm() {
  const [createdUser, setCreatedUser] = useState<string | null>(null);
  return (
    <Form<null>
      destination={{ endpoint: "/signup", method: "POST" }}
      onSuccess={(submissionData, _submissionResult) => {
        setCreatedUser(submissionData.username);
      }}
      buttonText="Sign Up"
    >
      {createdUser !== null && (
        <Alert type="success">
          <p>
            Your account has been created. You may{" "}
            <Link
              to={"/login"}
              state={{
                createdUser,
              }}
            >
              log in
            </Link>{" "}
            to your new account.
          </p>
        </Alert>
      )}
      <label htmlFor="username">
        <span>Username</span>
        <InputChecklist
          input={<input type="text" id="username" autoComplete="off" />}
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
        <span>Password</span>
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
        <span>Confirm password</span>
        <input type="password" id="confirmPassword" autoComplete="off" />
      </label>
    </Form>
  );
}
