import { Air } from "@mui/icons-material";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
  type PostComponentContext,
  type User,
} from "../../types";
import { useReplyChildren } from "../../hooks/useReplyChildren";
import { Reply } from "./Reply";
import { useOutletContext } from "react-router-dom";

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
        <div className="spacer">
          <Air />
          <p>
            This post doesn't have any replies yet.
            {user && (
              <>
                <br />
                Be the first to reply!
              </>
            )}
          </p>
        </div>
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
