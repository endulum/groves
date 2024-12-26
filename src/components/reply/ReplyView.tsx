import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { type Post, type PostComponentContext } from "../../types";
import { Alert } from "../Alert";
import { AllReplies } from "./AllReplies";
import { IsolatedReply } from "./IsolatedReply";
import { useLogger } from "../../hooks/useLogger";

export function ReplyView({
  data,
  postContext,
}: {
  data: Post;
  postContext: PostComponentContext;
}) {
  const { reply } = useParams();
  const [sort, setSort] = useState<string>("hot");

  useLogger({ reply });

  return (
    <>
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
        <Alert type="info" className="mt-1 mb-1">
          <p>
            Viewing an isolated reply.{" "}
            <Link to={`/post/${data.id}`}>View all replies</Link>
          </p>
        </Alert>
      )}

      <div className="replies">
        {reply ? (
          <IsolatedReply
            postContext={{
              ...postContext,
              isolateReplyID: reply,
            }}
            sort={sort}
          />
        ) : (
          <AllReplies postData={data} postContext={postContext} sort={sort} />
        )}
      </div>
    </>
  );
}
