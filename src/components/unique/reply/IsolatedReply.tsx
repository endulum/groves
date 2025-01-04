import { useEffect } from "react";

import {
  type PostComponentContext,
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../../types";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { Reply } from "./Reply";

export function IsolatedReply({
  postContext,
  sort,
}: {
  postContext: PostComponentContext;
  sort: string;
}) {
  const { loading, error, data, get } = useGet<TReply>(
    `/reply/${postContext.isolateReplyID}/replies?sort=${sort}`
  );

  useEffect(() => {
    get();
  }, [sort, postContext.isolateReplyID]);

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
          context={{
            ...postContext,
            ...data.context,
            isTopLevel: true,
          }}
          key={data.id}
        />
      )}
    </>
  );
}
