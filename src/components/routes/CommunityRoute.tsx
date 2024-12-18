import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { PostsSubroute } from "./PostsSubroute";

export function CommunityRoute() {
  const { community } = useParams();
  const { loading, error, data } = useGet<{
    id: number;
    urlName: string;
    canonicalName: string;
    created: string;
    _count: {
      posts: number;
    };
  }>(`/community/${community}`);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting community info..."
      />
    );
  if (data)
    return (
      <>
        <h2>{data.canonicalName}</h2>
        <p>
          Created{" "}
          {DateTime.fromISO(data.created).toLocaleString({
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <PostsSubroute
          communityUrl={data.urlName}
          communityName={data.canonicalName}
          postCount={data._count.posts}
        />
      </>
    );
}
