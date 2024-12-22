import { useDocumentTitle } from "usehooks-ts";
import { useOutletContext, Link } from "react-router-dom";
import { Park, Air } from "@mui/icons-material";

import { type Community } from "../../types";
import { PostSearch } from "../forms/PostSearch";
import { useLogger } from "../../hooks/useLogger";

export function CommunityPosts() {
  const { community } = useOutletContext<{ community: Community }>();
  useDocumentTitle(
    `${community.canonicalName} :: ${import.meta.env.VITE_APP_NAME}`
  );
  // useLogger({ community });

  return (
    <>
      <div className="flex-row jc-spb mb-1 mt-1">
        <h3>Posts</h3>
        <Link
          type="button"
          to={{
            pathname: `/community/${community.urlName}/newPost`,
          }}
          state={{ communityName: community.urlName }}
          className="button primary"
        >
          <Park />
          <span>New Post</span>
        </Link>
      </div>
      {community._count.posts > 0 ? (
        <PostSearch communityUrl={community.urlName} />
      ) : (
        <div>
          <hr className="mb-1" />
          <div className="spacer">
            <Air />
            <p>
              This community doesn't have any posts yet.
              <br />
              Be the first to post!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
