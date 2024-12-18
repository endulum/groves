import { Park, Air } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { PostSearch } from "../forms/PostSearch";

export function PostsSubroute({
  communityUrl,
  communityName,
  postCount,
}: {
  communityUrl: string;
  communityName: string;
  postCount: number;
}) {
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
