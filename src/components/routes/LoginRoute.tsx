import { useDocumentTitle } from "usehooks-ts";

import { LoginForm } from "../forms/LoginForm";
import { GithubAuthButton } from "../unique/auth/GithubAuthButton";

export function LoginRoute() {
  useDocumentTitle(`Log In :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Log In</h2>
        <GithubAuthButton />
      </div>
      <LoginForm />
    </>
  );
}
