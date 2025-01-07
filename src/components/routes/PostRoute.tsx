import { useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { type PostWithMeta } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { PostContextProvider } from "../unique/post/PostContext";
import { PostContent } from "../unique/post/PostContent";
import { ReplyView } from "../unique/reply/ReplyView";

export function PostRoute() {
  const { post, reply } = useParams();
  const { loading, error, data } = useGet<PostWithMeta>(
    `/post/${post}?includeCommMeta=true&includePinnedReply=true`
  );

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
        <PostContextProvider data={data} replyId={reply}>
          <PostContent />
          <ReplyView />
        </PostContextProvider>
      </>
    );
}
