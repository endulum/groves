import { Link, useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { RepliesSubroute } from "./RepliesSubroute";
import { MDWrapper } from "../MDWrapper";

export function PostRoute() {
  const { post } = useParams();
  const { loading, error, data } = useGet<{
    community: {
      id: number;
      urlName: string;
      canonicalName: string;
    };
    author: {
      id: number;
      username: string;
    };
    title: string;
    id: string;
    content: string;
    datePosted: string;
    lastEdited: null | string;
  }>(`/post/${post}`);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post info..."
      />
    );
  if (data)
    return (
      <>
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
            `, edited ${DateTime.fromISO(data.lastEdited).toRelative()}`}
        </small>
        <h2>{data.title}</h2>
        <div className="post-content">
          <MDWrapper content={data.content} />
        </div>
        <hr />
        <RepliesSubroute postId={data.id} />
      </>
    );
}
