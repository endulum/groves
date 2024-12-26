import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
  PostComponentContext,
} from "../../types";
import { useReplyChildren } from "../../hooks/useReplyChildren";
import { Reply } from "./Reply";

export function TopLevelReplies({
  data,
  postContext,
}: {
  data: TReply;
  postContext: PostComponentContext;
}) {
  const { loading, children, loadMoreChildren, setNextUrl } =
    useReplyChildren(data);

  return (
    <>
      {children.map((child) => (
        <Reply
          data={child as VisibleReply | HiddenReply}
          context={{
            ...postContext,
            ...child.context,
            isTopLevel: true,
          }}
          key={child.id}
        />
      ))}
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
