import { Air, Spa, WbSunny, ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import { type Post } from "../../types";
import { Search } from "../Search";
import { MDWrapper } from "../MDWrapper";
import { ReadMore } from "../ReadMore";
import { Username } from "../Username";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function GlobalFeed() {
  return (
    <Search<Post>
      endpoint="/all"
      resultsPropertyName="posts"
      mapResults={(post: Post) => {
        const { upvotes, downvotes } = post._count;
        const score = upvotes - downvotes;
        return (
          <div className="search-result" key={post.id}>
            <div className="flex-row gap-0-5 jc-spb mb-1 align-start">
              <div>
                <small>
                  Posted under{" "}
                  <Link to={`/community/${post.community.urlName}`}>
                    {post.community.canonicalName}
                  </Link>{" "}
                  by <Username user={post.author} role={null} />{" "}
                  <span
                    title={DateTime.fromISO(post.datePosted).toLocaleString(
                      format
                    )}
                  >
                    {DateTime.fromISO(post.datePosted).toRelative()}
                  </span>
                </small>
                <h3>{post.title}</h3>
              </div>

              <div className="flex-row gap-0-5">
                <div className="flex-row gap-0-5">
                  <div
                    className="flex-col gap-0-5"
                    title={`${upvotes} upvotes, ${downvotes} downvotes`}
                  >
                    <WbSunny
                      style={{
                        color: score > 0 ? "var(--accent2" : "var(--border)",
                      }}
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

            <ReadMore link={`/post/${post.id}`}>
              <MDWrapper content={post.content} />
            </ReadMore>
          </div>
        );
      }}
      emptyElement={
        <div className="spacer">
          <Air />
          <p>No site activity to show.</p>
        </div>
      }
    />
  );
}
