import { useEffect, useState } from "react";

import { useGet } from "../../hooks/useGet";
import { type Reply as TReply } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { Reply } from "../Reply";
import { Alert } from "../Alert";
import { Link } from "react-router-dom";

export function IsolatedReplySubroute({
  postId,
  replyId,
  isMod,
}: {
  postId: string;
  replyId: string;
  isMod: boolean;
}) {
  const {
    loading: replyLoading,
    error: replyError,
    data: replyData,
    get: replyGet,
  } = useGet<TReply>(`/reply/${replyId}`);

  const { loading, error, data, get } = useGet<{
    children: TReply[];
  }>(`/reply/${replyId}/replies`);

  const [reply, setReply] = useState<TReply | null>(null);

  useEffect(() => {
    if (replyData && data)
      setReply({
        ...replyData,
        children: data.children,
      });
  }, [replyData, data]);

  const reloadReply = async () => {
    setReply(null);
    await Promise.all([replyGet(false), get(false)]);
  };

  useEffect(() => {
    reloadReply();
  }, [replyId]);

  return (
    <>
      <br />
      <Alert type="info">
        <p>
          Viewing an isolated reply.{" "}
          <Link to={`/post/${postId}`}>View all replies</Link>
        </p>
      </Alert>
      <div className="replies flex-col align-start gap-0-5">
        {(loading || replyLoading || error || replyError) && (
          <LoadingSpacer
            loading={loading || replyLoading}
            error={replyError ?? error}
            customLoadingText="Getting reply..."
          />
        )}
        {replyData && data && reply && (
          <Reply data={reply} shaded={false} firstLevel={true} isMod={isMod} />
        )}
      </div>
    </>
  );
}
