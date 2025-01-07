import { useContext, useEffect } from "react";

import { type Reply } from "../../../types";
import { PostContext } from "../post/PostContext";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { TopLevelReplies } from "./TopLevelReplies";

export function AllReplies({ sort }: { sort: string }) {
  const { data: postData } = useContext(PostContext);
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
      {data && <TopLevelReplies data={data} />}
    </>
  );
}
