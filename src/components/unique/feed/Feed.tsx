import { ArrowForwardIos, Spa, WbSunny, AcUnit } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { type Post } from "../../../types";
import { Paginator } from "../../reusable/Paginator";
import { MDWrapper } from "../../reusable/MDWrapper";
import { Username } from "../../reusable/Username";
import { ReadMore } from "../../reusable/ReadMore";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";

export function Feed({ type }: { type: "global" | "following" }) {
  return (
    <Paginator<Post>
      startingUrl={type === "following" ? "/feed" : "/all"}
      itemsPropertyName="posts"
      mapItems={(post: Post) => {
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
                  <DateWithTitle dateString={post.datePosted} />
                </small>
                <h3>
                  {post.title}
                  {post.readonly && (
                    <span title="This post is frozen.">
                      {" "}
                      <AcUnit
                        style={{
                          color: "var(--info)",
                          height: "1.25rem",
                          verticalAlign: "text-top",
                        }}
                      />
                    </span>
                  )}
                </h3>
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
        <NoResultsSpacer>
          <p>
            No community activity to show.
            {type === "following" && (
              <>
                <br />
                Consider following some communities!
              </>
            )}
          </p>
        </NoResultsSpacer>
      }
    />
  );
}
