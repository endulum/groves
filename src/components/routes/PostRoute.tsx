import { useParams, useOutletContext, useLocation } from "react-router-dom";
import { useBoolean, useDocumentTitle } from "usehooks-ts";

import { type Post, type User } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { useEffect } from "react";
import { PostView } from "../unique/post/PostView";

export function PostRoute() {
  const { post } = useParams();

  const { loading, error, data, get } = useGet<Post>(`/post/${post}`);
  const { user } = useOutletContext<{ user: User }>();
  const { value: readonly, setValue: setReadonly } = useBoolean(false);

  useEffect(() => {
    if (data && data.readonly === true) setReadonly(true);
  }, [data]);

  // useEffect(() => {
  //   if (state && state.reload === true) get();
  // }, [state]);

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
            isPostReadonly: readonly,
            authUserID: user ? user.id : null,
            postAuthorID: data.author.id,
            isolateReplyID: null,
          }}
        />
      </>
    );
}
