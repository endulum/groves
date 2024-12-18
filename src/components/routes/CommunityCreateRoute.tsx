import { useLoginRedirect } from "../../hooks/useLoginRedirect";
import { CommunityCreateForm } from "../forms/CommunityCreateForm";

export function CommunityCreateRoute() {
  useLoginRedirect();
  return (
    <>
      <h2>Create a New Community</h2>
      <CommunityCreateForm />
    </>
  );
}
