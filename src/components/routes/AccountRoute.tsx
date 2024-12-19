import { useDocumentTitle } from "usehooks-ts";

import { AccountForm } from "../forms/AccountForm";

export function AccountRoute() {
  useDocumentTitle(`Account Settings :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Account Settings</h2>
      <AccountForm />
    </>
  );
}
