import { useOutletContext, useLocation } from "react-router-dom";

import { Form } from "../Form";
import { setStoredToken } from "../../functions/tokenUtils";

export function LoginForm() {
  const { initUser } = useOutletContext<{ initUser: () => Promise<void> }>();
  const { state } = useLocation();
  return (
    <Form<{ token: string }>
      destination={{ endpoint: "/login", method: "POST" }}
      onSuccess={(_submissionData, submissionResult: { token: string }) => {
        setStoredToken(submissionResult.token);
        initUser();
      }}
      buttonText="Log In"
    >
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
