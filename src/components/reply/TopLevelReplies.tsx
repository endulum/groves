import { useEffect } from "react";
import { Air } from "@mui/icons-material";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { Reply } from "./Reply";
import { LoadingSpacer } from "../LoadingSpacer";
import { useGet } from "../../hooks/useGet";
import { useReplyChildren } from "../../hooks/useReplyChildren";

export function TopLevelReplies({
  postId,
  sort,
}: {
  postId: string;
  sort: string;
}) {
  const { loading, error, data, get } = useGet<
    TReply & { viewingAsMod: boolean }
  >(`/post/${postId}/replies?sort=${sort}&levels=2&takePerLevel=2`);

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
      {data &&
        (data.children && data.children.length > 0 ? (
          <NullParentReplies data={data} />
        ) : (
          <div className="spacer">
            <Air />
            <p>
              This post doesn't have any replies yet. <br />
              Be the first to reply!
            </p>
          </div>
        ))}
    </>
  );
}
function NullParentReplies({ data }: { data: TReply }) {
  const { loading, children, loadMoreChildren, setNextUrl } =
    useReplyChildren(data);

  return (
    <>
      {children.map((child) => (
        <Reply
          data={child as VisibleReply | HiddenReply}
          status={{
            ...data.state,
            isTopLevel: true,
            currentIsolatedReply: null,
          }}
          key={child.id}
        />
      ))}

      {loadMoreChildren && (
        <button
          onClick={() => {
            setNextUrl(loadMoreChildren);
          }}
          className="button plain secondary reply-loadmore"
          disabled={loading}
        >
          <small>{loading ? "Loading..." : "Load more replies"}</small>
        </button>
      )}
    </>
  );
}
