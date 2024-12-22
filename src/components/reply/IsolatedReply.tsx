import { useEffect } from "react";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { Reply } from "./Reply";
import { LoadingSpacer } from "../LoadingSpacer";
import { useGet } from "../../hooks/useGet";

export function IsolatedReply({
  replyId,
  sort,
}: {
  replyId: string;
  sort: string;
}) {
  const { loading, error, data, get } = useGet<TReply>(
    `/reply/${replyId}/replies`
  );

  useEffect(() => {
    get(false);
  }, [replyId, sort]);

  return (
    <>
      {(loading || error) && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Getting reply..."
        />
      )}
      {data && (
        <Reply
          data={data as VisibleReply | HiddenReply}
          status={{
            ...data.state,
            isTopLevel: true,
            currentIsolatedReply: replyId,
          }}
          key={data.id}
        />
      )}
    </>
  );
}
