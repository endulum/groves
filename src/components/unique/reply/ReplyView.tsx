import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Alert } from "../../reusable/Alert";
import { AllReplies } from "./AllReplies";
import { IsolatedReply } from "./IsolatedReply";
import { PinnedReply } from "./PinnedReply";
import { PostContext } from "../post/PostContext";

export function ReplyView() {
  const {
    data: postData,
    isolateReplyID,
    pinnedReply,
  } = useContext(PostContext);
  const [sort, setSort] = useState<string>("hot");

  return (
    <>
      <hr className="mt-1 mb-1" />
      {!isolateReplyID && pinnedReply && (
        <div className="mb-1">
          <PinnedReply data={pinnedReply} />
        </div>
      )}

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
      <div className="replies">
        {isolateReplyID && (
          <Alert type="info" className="mt-1 mb-1">
            <p>
              Viewing an isolated reply.{" "}
              <Link to={`/post/${postData.id}`} state={{ reload: true }}>
                View all replies
              </Link>
            </p>
          </Alert>
        )}

        {isolateReplyID ? (
          <IsolatedReply sort={sort} />
        ) : (
          <AllReplies sort={sort} />
        )}
      </div>
    </>
  );
}
