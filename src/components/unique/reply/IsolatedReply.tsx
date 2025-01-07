import { useContext, useEffect } from "react";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../../types";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { Reply } from "./Reply";
import { PostContext } from "../post/PostContext";

export function IsolatedReply({ sort }: { sort: string }) {
  const { isolateReplyID } = useContext(PostContext);
  const { loading, error, data, get } = useGet<TReply>(
    `/reply/${isolateReplyID}/replies?sort=${sort}`
  );

  useEffect(() => {
    get();
  }, [sort, isolateReplyID]);

  return (
    <>
      {(loading || error) && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Getting replies..."
        />
      )}
      {data && (
        <Reply
          data={data as VisibleReply | HiddenReply}
          isTopLevel={true}
          key={data.id}
        />
      )}
    </>
  );
}
