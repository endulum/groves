import { Post, PostComponentContext, Reply } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { TopLevelReplies } from "./TopLevelReplies";
import { useEffect } from "react";

export function AllReplies({
  postData,
  postContext,
  sort,
}: {
  postData: Post;
  postContext: PostComponentContext;
  sort: string;
}) {
  const { loading, error, data, get } = useGet<Reply>(
    `/post/${postData.id}/replies?sort=${sort}`
  );

  useEffect(() => {
    get(false);
  }, [sort]);

  return (
    <>
      {(loading || error) && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Getting replies..."
        />
      )}
      {data && <TopLevelReplies data={data} postContext={postContext} />}
    </>
  );
}
