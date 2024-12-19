import { useParams, useLocation, Link } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { useLoginRedirect } from "../../hooks/useLoginRedirect";
import { Alert } from "../Alert";
import { PostCreateForm } from "../forms/PostCreateForm";

export function PostCreateRoute() {
  useLoginRedirect();
  useDocumentTitle(`Create Post :: ${import.meta.env.VITE_APP_NAME}`);

  const { community } = useParams<{ community: string }>();
  const { state } = useLocation();

  return state.communityName ? (
    <>
      <small>
        Creating a post for{" "}
        <Link to={`/community/${community}`}>{state.communityName}</Link>
      </small>
      <h2>Create a New Post</h2>
      <PostCreateForm communityUrl={community as string} />
    </>
  ) : (
    <Alert type="warning">
      <p>You can only visit this page from within the site.</p>
    </Alert>
  );
}
