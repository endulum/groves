import { Park, Air } from "@mui/icons-material";
import { Link, useOutletContext } from "react-router-dom";

import { PostSearch } from "../forms/PostSearch";
import { type User } from "../../types";

export function PostsSubroute({
  communityUrl,
  communityName,
  postCount,
}: {
  communityUrl: string;
  communityName: string;
  postCount: number;
}) {
  const { user } = useOutletContext<{ user: User }>();
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Posts</h2>
        <Link
          type="button"
          to={{
            pathname: `/community/${communityUrl}/newPost`,
          }}
          state={{ communityName }}
          className="button primary"
        >
          <Park />
          <span>New Post</span>
        </Link>
      </div>
      {postCount > 0 ? (
        <PostSearch communityUrl={communityUrl} />
      ) : (
        <div>
          <hr className="mb-1" />
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
