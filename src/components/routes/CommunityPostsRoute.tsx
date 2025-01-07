import { useOutletContext } from "react-router-dom";

import { type User, type Community } from "../../types";
import { CommunityPinnedPosts } from "../unique/community/CommunityPinnedPosts";
import { CommunityPostSearch } from "../forms/search/CommunityPostSearch";
import { NoResultsSpacer } from "../reusable/NoResultsSpacer";

export function CommunityPostsRoute() {
  const { community, user } = useOutletContext<{
    community: Community;
    user: User;
  }>();

  return (
    <>
      {community._count.pinnedPosts > 0 && (
        <>
          <h3 className="mb-1">Pinned Posts</h3>
          <div>
            <CommunityPinnedPosts />
          </div>
        </>
      )}
      <h3 className="mb-1">Search Posts</h3>
      {community._count.posts > 0 ? (
        <CommunityPostSearch communityUrl={community.urlName} />
      ) : (
        <div>
          <NoResultsSpacer>
            <p>
              This community doesn't have any posts yet.
              {user && !community.readonly && (
                <>
                  <br />
                  Be the first to post!
                </>
              )}
            </p>
          </NoResultsSpacer>
        </div>
      )}
    </>
  );
}
