import { useDocumentTitle } from "usehooks-ts";

import { LoginForm } from "../forms/LoginForm";

export function LoginRoute() {
  useDocumentTitle(`Log In :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Log In</h2>
      <LoginForm />
    </>
  );
}
