import { useParams, Link } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";
import { useState } from "react";

import { type Post } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { PostContent } from "../post/PostContent";
import { Alert } from "../Alert";
import { IsolatedReply } from "../reply/IsolatedReply";
import { TopLevelReplies } from "../reply/TopLevelReplies";

export function PostRoute() {
  const { post, reply } = useParams();
  // const { user } = useOutletContext<{ user: User }>();
  const [sort, setSort] = useState<string>("top");
  const { loading, error, data } = useGet<Post>(`/post/${post}`);

  useDocumentTitle(
    `${
      data?.title
        ? `${data.title} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing post..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post..."
      />
    );
  if (data)
    return (
      <>
        <PostContent data={data} />

        <hr className="mt-1 mb-1" />
        <div className="flex-row jc-spb">
          <h3>Replies</h3>
          <label htmlFor="sort" className="flex-row gap-1">
            <span>Sort by:</span>
            <select
              id="sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="top">Top</option>
              <option value="hot">Hot</option>
              <option value="best">Best</option>
              <option value="controversial">Controversial</option>
              <option value="latest">Newest</option>
            </select>
          </label>
        </div>

        {reply && (
          <Alert type="info" className="mt-1">
            <p>
              Viewing an isolated reply.{" "}
              <Link to={`/post/${post}`}>View all replies</Link>
            </p>
          </Alert>
        )}

        <div className="replies flex-col align-start gap-0-5 mt-1">
          {reply ? (
            // if startingParent is not null, we're viewing one comment and its children
            <IsolatedReply replyId={reply} sort={sort} />
          ) : (
            // if startingParent is null, we're viewing all top-level comments
            <TopLevelReplies postId={data.id} sort={sort} />
          )}
        </div>
      </>
    );
}
