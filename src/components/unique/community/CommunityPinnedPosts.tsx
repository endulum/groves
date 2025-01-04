import { Link, useOutletContext } from "react-router-dom";
import { PushPin } from "@mui/icons-material";

import { type Post, type User, type Community } from "../../../types";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { MDWrapper } from "../../reusable/MDWrapper";
import { ReadMore } from "../../reusable/ReadMore";

import { Username } from "../../reusable/Username";

export function CommunityPinnedPosts() {
  const { community, moderators } = useOutletContext<{
    community: Community;
    moderators: User[];
  }>();
  const { loading, error, data } = useGet<{ pinnedPosts: Post[] }>(
    `/community/${community.urlName}/pinned`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Finding pins..."
      />
    );
  if (data) {
    if (data.pinnedPosts.length === 0)
      return (
        <p className="mb-1">
          <i>No posts were pinned.</i>
        </p>
      );
    return (
      <div className="pinned-posts flex-row gap-0-5 mb-1">
        {data.pinnedPosts.map((post) => (
          <div className="pinned-post p-0-75 w100" key={post.id}>
            <div className="flex-row jc-spb mb-0-5 align-start">
              <div className="flex-row gap-0-5 align-start">
                <PushPin
                  style={{ color: "var(--accent2)", marginTop: "0.5rem" }}
                />
                <div>
                  <small>
                    by{" "}
                    <Username
                      user={post.author}
                      role={
                        moderators.find((mod) => mod.id === post.author.id) !==
                        undefined
                          ? "mod"
                          : community.admin.id === post.author.id
                          ? "admin"
                          : null
                      }
                    />
                  </small>
                  <h4>{post.title}</h4>
                </div>
              </div>

              <Link
                type="button"
                className="button plain secondary mw-mxc"
                to={`/post/${post.id}`}
              >
                <small>go to post</small>
              </Link>
            </div>
            <ReadMore link={`/post/${post.id}`} maxHeight={100}>
              <MDWrapper content={post.content} />
            </ReadMore>
          </div>
        ))}
      </div>
    );
  }
}
