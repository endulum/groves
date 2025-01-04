import { useOutletContext } from "react-router-dom";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
  type PostComponentContext,
  type User,
} from "../../../types";
import { useReplyChildren } from "../../../hooks/useReplyChildren";
import { Reply } from "./Reply";
import { NoReplySpacer } from "./NoReplySpacer";

export function TopLevelReplies({
  data,
  postContext,
}: {
  data: TReply;
  postContext: PostComponentContext;
}) {
  const { user } = useOutletContext<{ user: User }>();
  const { loading, children, loadMoreChildren, setNextUrl } =
    useReplyChildren(data);

  return (
    <>
      {children.length > 0 ? (
        children.map((child) => (
          <Reply
            data={child as VisibleReply | HiddenReply}
            context={{
              ...postContext,
              ...child.context,
              isTopLevel: true,
            }}
            key={child.id}
          />
        ))
      ) : (
        <NoReplySpacer
          isUser={!!user}
          isReadonly={postContext.isCommReadonly || postContext.isPostReadonly}
        />
      )}
      {loadMoreChildren && (
        <button
          onClick={() => {
            setNextUrl(loadMoreChildren);
          }}
          className="button plain secondary reply-loadmore mt-1"
          disabled={loading}
        >
          <small>{loading ? "Loading..." : "Load more replies"}</small>
        </button>
      )}
    </>
  );
}
