import { Link, useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { MDWrapper } from "../MDWrapper";
import { type Post } from "../../types";
import { TopLevelReplies } from "../reply/TopLevelReplies";
import { IsolatedReply } from "../reply/IsolatedReply";

export function PostRoute() {
  const { post, reply } = useParams();
  const { loading, error, data } = useGet<Post>(`/post/${post}`);

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
        <h2>{data.title}</h2>
        <div className="post-content">
          <MDWrapper content={data.content} />
        </div>

        {/* replies */}
        <hr />
        {/* <ReplyView postId={data.id} startingParent={reply} /> */}
        <>
          <h3 className="mt-1">Replies</h3>
          <div className="replies flex-col align-start gap-0-5">
            {reply ? (
              // if startingParent is not null, we're viewing one comment and its children
              <IsolatedReply postId={data.id} replyId={reply} />
            ) : (
              // if startingParent is null, we're viewing all top-level comments
              <TopLevelReplies postId={data.id} />
            )}
          </div>
        </>
      </>
    );
}
