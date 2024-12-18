import { DateTime } from "luxon";
import { Park, Spa, WbSunny, ArrowForwardIos } from "@mui/icons-material";

import { Search } from "../Search";
import { Link } from "react-router-dom";

type PostResult = {
  id: string;
  title: string;
  datePosted: string;
  _count: {
    upvotes: number;
    downvotes: number;
    replies: number;
  };
  author: {
    id: number;
    username: string;
  };
};

export function PostSearch({ communityUrl }: { communityUrl: string }) {
  return (
    <Search<PostResult>
      startingParams={{ sort: "hot", take: "10" }}
      endpoint={`/community/${communityUrl}/posts`}
      formContent={
        <>
          <label htmlFor="title" className="search-label">
            Post Title
          </label>
          <input type="text" id="title" />

          <label htmlFor="sort" className="search-label">
            Sort by
          </label>
          <select id="sort">
            <option value="top">Top</option>
            <option value="hot">Hot</option>
            <option value="controversial">Controversial</option>
            <option value="best">Best</option>
            <option value="newest">Newest</option>
            <option value="replies">Most replies</option>
          </select>
        </>
      }
      resultsPropertyName="posts"
      mapResults={(post: PostResult) => {
        const { upvotes, downvotes } = post._count;
        const score = upvotes - downvotes;
        return (
          <div className="search-result" key={post.id}>
            <div className="flex-row jc-spb gap-1">
              <div className="flex-row gap-0-75 align-start">
                <Park style={{ width: "2rem", height: "2rem" }} />
                <div>
                  <h3>{post.title}</h3>
                  <small>
                    by{" "}
                    <Link to={`/user/${post.author.username}`}>
                      {post.author.username}
                    </Link>{" "}
                    {DateTime.fromISO(post.datePosted).toRelative()}
                  </small>
                </div>
              </div>
              <div className="flex-row gap-1">
                <div className="flex-row gap-0-5">
                  <div
                    className="flex-col gap-0-5"
                    title={`${upvotes} upvotes, ${downvotes} downvotes`}
                  >
                    <WbSunny
                      style={{ color: score > 0 ? "var(--accent2" : "#ddd" }}
                    />
                    <small>{score}</small>
                  </div>
                  <div
                    className="flex-col gap-0-5"
                    title={`${post._count.replies} replies`}
                  >
                    <Spa />
                    <small>{post._count.replies}</small>
                  </div>
                </div>
                <Link
                  type="button"
                  className="button plain secondary"
                  to={`/post/${post.id}`}
                  title="View post"
                >
                  <ArrowForwardIos />
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
