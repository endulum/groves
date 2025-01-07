import { useContext } from "react";
import { useOutletContext } from "react-router-dom";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
  type User,
} from "../../../types";
import { useReplyChildren } from "../../../hooks/useReplyChildren";
import { PostContext } from "../post/PostContext";
import { Reply } from "./Reply";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";

export function TopLevelReplies({ data }: { data: TReply }) {
  const { user } = useOutletContext<{ user: User }>();
  const { data: postData } = useContext(PostContext);
  const { loading, children, loadMoreChildren, setNextUrl } =
    useReplyChildren(data);

  return (
    <>
      {children.length > 0 ? (
        children.map((child) => (
          <Reply
            data={child as VisibleReply | HiddenReply}
            key={child.id}
            isTopLevel={true}
          />
        ))
      ) : (
        <NoResultsSpacer>
          <p>
            This post doesn't have any replies yet.
            {user && !(postData.community.readonly || postData.readonly) && (
              <>
                <br />
                Be the first to reply!
              </>
            )}
          </p>
        </NoResultsSpacer>
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
