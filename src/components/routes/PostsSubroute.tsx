import { Park } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { PostSearch } from "../forms/PostSearch";

export function PostsSubroute({
  communityUrl,
  communityName,
}: {
  communityUrl: string;
  communityName: string;
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
      <PostSearch communityUrl={communityUrl} />
    </>
  );
}
