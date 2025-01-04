import { useEffect } from "react";

import {
  type Post,
  type PostComponentContext,
  type Reply,
} from "../../../types";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { TopLevelReplies } from "./TopLevelReplies";

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
    get();
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
