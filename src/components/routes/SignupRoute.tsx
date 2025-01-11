import { useDocumentTitle } from "usehooks-ts";

import { SignupForm } from "../forms/SignupForm";
import { GithubAuthButton } from "../unique/auth/GithubAuthButton";

export function SignupRoute() {
  useDocumentTitle(`Sign Up :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Sign Up</h2>
        {import.meta.env.VITE_GH_CLIENT_ID &&
          import.meta.env.VITE_GH_CLIENT_ID.trim !== "" && <GithubAuthButton />}
      </div>
      <SignupForm />
    </>
  );
}
