import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
  User,
} from "../../types";
import { Reply } from "./Reply";
import { LoadingSpacer } from "../LoadingSpacer";
import { useGet } from "../../hooks/useGet";
import { Alert } from "../Alert";

export function IsolatedReply({
  postId,
  replyId,
  sort,
}: {
  postId: string;
  replyId: string;
  sort: string;
}) {
  const { user } = useOutletContext<{ user: User }>();

  const { loading, error, data, get } = useGet<
    TReply & { viewingAsMod: boolean }
  >(`/reply/${replyId}/replies`);

  useEffect(() => {
    get(false);
  }, [replyId, sort]);

  return (
    <>
      <Alert type="info">
        <p>
          Viewing an isolated reply.{" "}
          <Link to={`/post/${postId}`}>View all replies</Link>
        </p>
      </Alert>
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
            replyParam: replyId,
            isShaded: false,
            isMod: data.viewingAsMod,
            isTopLevel: true,
            isLoggedIn: !!user,
          }}
          key={data.id}
        />
      )}
    </>
  );
}
