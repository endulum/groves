import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router-dom";
import { Air } from "@mui/icons-material";

import { type User, type Community } from "../../types";
import { CommunityPostSearch } from "../forms/search/CommunityPostSearch";

export function CommunityPostsRoute() {
  const { community, user } = useOutletContext<{
    community: Community;
    user: User;
  }>();
  useDocumentTitle(
    `${community.canonicalName} :: ${import.meta.env.VITE_APP_NAME}`
  );

  return (
    <>
      <h3 className="mb-1">Search Posts</h3>
      {community._count.posts > 0 ? (
        <CommunityPostSearch communityUrl={community.urlName} />
      ) : (
        <div>
          <div className="spacer">
            <Air />
            <p>
              This community doesn't have any posts yet.
              {user && (
                <>
                  <br />
                  Be the first to post!
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
