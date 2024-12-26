import { useParams, useOutletContext } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { type Post, type User } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { PostView } from "../post/PostView";

export function PostRoute() {
  const { post } = useParams();
  const { loading, error, data } = useGet<Post>(`/post/${post}`);
  const { user } = useOutletContext<{ user: User }>();

  useDocumentTitle(
    `${
      data?.title
        ? `${data.title} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing post..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post..."
      />
    );

  if (data)
    return (
      <>
        <PostView
          data={data}
          context={{
            ...data.context,
            isPostReadonly: data.readonly,
            authUserID: user ? user.id : null,
            postAuthorID: data.author.id,
            isolateReplyID: null,
          }}
        />
      </>
    );
}
