import { useDocumentTitle } from "usehooks-ts";

import { SignupForm } from "../forms/SignupForm";

export function SignupRoute() {
  useDocumentTitle(`Sign Up :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Sign Up</h2>
      <SignupForm />
    </>
  );
}
