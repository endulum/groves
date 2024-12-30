import {
  type PostComponentContext,
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { Reply } from "./Reply";
import { useEffect } from "react";

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
    get(false);
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

/* import {
  PostComponentContext,
  type Reply as TReply,
  type HiddenReply,
  type VisibleReply,
} from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { Reply } from "./Reply";

export function IsolatedReply({
  data,
  context,
}: {
  data: TReply;
  context: PostComponentContext;
}) {
  return (
    <Reply
      data={data as VisibleReply | HiddenReply}
      status={{
        ...data.state,
        isTopLevel: true,
        currentIsolatedReply: replyId,
      }}
      key={data.id}
    />
  );
} */

/* import { useEffect } from "react";

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
 */
