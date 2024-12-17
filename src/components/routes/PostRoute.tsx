import { Link, useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { MDWrapper } from "../MDWrapper";
import { type Post } from "../../types";
import { TopLevelReplies } from "../reply/TopLevelReplies";
import { IsolatedReply } from "../reply/IsolatedReply";
import { useState } from "react";
import { useLogger } from "../../hooks/useLogger";

export function PostRoute() {
  const { post, reply } = useParams();
  const { loading, error, data } = useGet<Post>(`/post/${post}`);

  const [sort, setSort] = useState<string>("top");
  useLogger({ sort });

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
        {/* context subtext */}
        <small>
          Posted under{" "}
          <Link to={`/community/${data.community.urlName}`}>
            {data.community.canonicalName}
          </Link>{" "}
          by{" "}
          <Link to={`/user/${data.author.username}`}>
            {data.author.username}
          </Link>{" "}
          {DateTime.fromISO(data.datePosted).toRelative()}
          {data.lastEdited &&
            `, last edited ${DateTime.fromISO(data.lastEdited).toRelative()}`}
        </small>

        {/* title and content */}
        <h2 className="mb-1">{data.title}</h2>
        <div className="mb-1">
          <MDWrapper content={data.content} />
        </div>

        {/* replies */}
        <hr className="mt-1 mb-1" />
        <>
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

          <div className="replies flex-col align-start gap-0-5 mt-1">
            {reply ? (
              // if startingParent is not null, we're viewing one comment and its children
              <IsolatedReply postId={data.id} replyId={reply} sort={sort} />
            ) : (
              // if startingParent is null, we're viewing all top-level comments
              <TopLevelReplies postId={data.id} sort={sort} />
            )}
          </div>
        </>
      </>
    );
}
