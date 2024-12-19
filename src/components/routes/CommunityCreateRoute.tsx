import { useDocumentTitle } from "usehooks-ts";

import { useLoginRedirect } from "../../hooks/useLoginRedirect";
import { CommunityCreateForm } from "../forms/CommunityCreateForm";

export function CommunityCreateRoute() {
  useLoginRedirect();
  useDocumentTitle(`Create Community :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Create a New Community</h2>
      <CommunityCreateForm />
    </>
  );
}
