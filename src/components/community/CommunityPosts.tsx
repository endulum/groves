import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext } from "react-router-dom";
import { Air } from "@mui/icons-material";

import { User, type Community } from "../../types";
import { PostSearch } from "../forms/PostSearch";

export function CommunityPosts() {
  const { community, user } = useOutletContext<{
    community: Community;
    user: User;
  }>();
  useDocumentTitle(
    `${community.canonicalName} :: ${import.meta.env.VITE_APP_NAME}`
  );

  return (
    <>
      {community._count.posts > 0 ? (
        <PostSearch communityUrl={community.urlName} />
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
