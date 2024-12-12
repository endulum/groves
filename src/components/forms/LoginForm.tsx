import { useState } from "react";
import { useOutletContext, useLocation } from "react-router-dom";

import { Form } from "../Form";
import { setStoredToken } from "../../functions/tokenUtils";
import { Alert } from "../Alert";

export function LoginForm() {
  const { initUser } = useOutletContext<{ initUser: () => Promise<void> }>();
  const { state } = useLocation();
  const [redirectFlag, setRedirectFlag] = useState(state?.redirect);

  return (
    <Form<{ token: string }>
      destination={{ endpoint: "/login", method: "POST" }}
      onClickSubmit={() => {
        if (redirectFlag) setRedirectFlag(false);
      }}
      onSuccess={(_submissionData, submissionResult: { token: string }) => {
        setStoredToken(submissionResult.token);
        initUser();
      }}
      buttonText="Log In"
    >
      {redirectFlag && (
        <Alert type="warning">
          <p>You must log in to perform this action.</p>
        </Alert>
      )}
      <label htmlFor="username">
        <span>Username</span>
        <input
          type="text"
          id="username"
          autoComplete="on"
          defaultValue={state ? state.createdUser : ""}
        />
      </label>
      <label htmlFor="password">
        <span>Password</span>
        <input type="password" id="password" autoComplete="on" />
      </label>
    </Form>
  );
}
