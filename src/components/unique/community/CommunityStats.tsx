import { Diversity3, Forest, Park } from "@mui/icons-material";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { type Community, type User } from "../../../types";
import { FollowButton } from "../../forms/buttons/FollowButton";

export function CommunityStats({ data }: { data: Community }) {
  const { user } = useOutletContext<{ user: User }>();
  const [followers, setFollowers] = useState<number>(data._count.followers);
  return (
    <div className="flex-row gap-0-5 mt-1 mb-1">
      <div className="community-stat flex-col gap-0-5">
        <Diversity3 />
        <p>
          {followers} Follower{followers !== 1 && "s"}
        </p>
        {user && !data.readonly && data.context.isFollowing !== null && (
          <FollowButton
            data={data}
            followers={followers}
            setFollowers={setFollowers}
          />
        )}
      </div>
      <div className="community-stat flex-col gap-0-5">
        <Forest />
        <p>
          {data._count.posts} Post{data._count.posts !== 1 && "s"}
        </p>
        {user && !data.readonly && (
          <Link
            to={`/community/${data.urlName}/new`}
            state={{ communityName: data.canonicalName }}
            type="button"
            className="button primary"
          >
            <Park />
            <span>New Post</span>
          </Link>
        )}
      </div>
    </div>
  );
}
