import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { DateTime } from "luxon";
import { useState, useEffect, useRef } from "react";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { MDWrapper } from "../MDWrapper";
import { type Post, type User } from "../../types";
import { TopLevelReplies } from "../reply/TopLevelReplies";
import { IsolatedReply } from "../reply/IsolatedReply";
import { VoteWidget } from "../VoteWidget";
import { FreezePost } from "../forms/ModReplyActions";
import { Alert } from "../Alert";
import { ReplyForm } from "../reply/ReplyForm";
import { PostEditForm } from "../forms/PostEditForm";

export function PostRoute() {
  const navigate = useNavigate();
  const { post, reply } = useParams();
  const { user } = useOutletContext<{ user: User }>();
  const { loading, error, data } = useGet<Post>(`/post/${post}`);

  const [sort, setSort] = useState<string>("top");
  const [readonly, setReadonly] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<{
    title: string;
    content: string;
    lastEdited: string | null;
  } | null>(null);
  const isPrefilled = useRef<boolean>(false);

  useEffect(() => {
    if (data && !isPrefilled.current) {
      setReadonly(data.readonly);
      setPostContent({
        title: data.title,
        content: data.content,
        lastEdited: data.lastEdited,
      });
      isPrefilled.current = true;
    }
  }, [data]);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post..."
      />
    );
  if (data && postContent)
    return (
      <>
        {/* title and content */}
        <div className="flex-row jc-spb gap-0-5">
          <div>
            <small>
              Posted under{" "}
              <Link to={`/community/${data.community.urlName}`}>
                {data.community.canonicalName}
              </Link>{" "}
              by{" "}
              <Link to={`/user/${data.author.username}`}>
                {data.author.username}
              </Link>{" "}
              {DateTime.fromISO(data.datePosted).toRelative()}
              {postContent.lastEdited &&
                `, last edited ${DateTime.fromISO(
                  postContent.lastEdited
                ).toRelative()}`}
            </small>
            {!editing && <h2>{postContent.title}</h2>}
          </div>
          <VoteWidget
            data={data}
            type="post"
            canVote={data.canVote && !readonly}
            orientation="horizontal"
          />
        </div>

        {readonly && (
          <Alert type="info" className="mt-1">
            <p>
              This post is frozen. Voting, replying, and editing are blocked.
            </p>
          </Alert>
        )}

        <div className="mb-1 mt-1">
          {editing ? (
            <PostEditForm
              data={data}
              setPostContent={setPostContent}
              setEditing={setEditing}
            />
          ) : (
            <MDWrapper content={postContent.content} />
          )}
        </div>

        {replying && user && (
          <ReplyForm
            postId={data.id}
            parentId={null}
            onSuccess={(_submissionData, submissionResult) => {
              setReplying(false);
              navigate(
                `/post/${data.id}/reply/${
                  (submissionResult as { id: string }).id
                }`
              );
            }}
          />
        )}

        {/* actions */}
        <div className="linkrow flex-row gap-0-5">
          {!readonly &&
            user &&
            data.author.id === user.id &&
            (editing ? (
              <button
                type="button"
                className="button plain secondary"
                onClick={() => {
                  setEditing(false);
                }}
              >
                <small style={{ color: "crimson" }}>cancel editing</small>
              </button>
            ) : (
              <button
                type="button"
                className="button plain secondary"
                onClick={() => {
                  setEditing(true);
                }}
              >
                <small>edit</small>
              </button>
            ))}
          {!readonly &&
            user &&
            (replying ? (
              <button
                type="button"
                className="button plain secondary"
                onClick={() => setReplying(false)}
              >
                <small style={{ color: "crimson" }}>cancel replying</small>
              </button>
            ) : (
              <button
                type="button"
                className="button plain secondary"
                onClick={() => setReplying(true)}
              >
                <small>reply</small>
              </button>
            ))}
          {data.viewingAsMod && (
            <FreezePost
              postId={data.id}
              readonly={readonly}
              setReadonly={setReadonly}
            />
          )}
        </div>

        {/* replies */}
        <hr className="mt-1 mb-1" />
        <>
          <div className="flex-row jc-spb">
            <h3>Replies</h3>
            <label htmlFor="sort" className="flex-row gap-1">
              <span>Sort by:</span>
              <select
                id="sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <option value="top">Top</option>
                <option value="hot">Hot</option>
                <option value="best">Best</option>
                <option value="controversial">Controversial</option>
                <option value="latest">Newest</option>
              </select>
            </label>
          </div>

          <div className="replies flex-col align-start gap-0-5 mt-1">
            {reply ? (
              // if startingParent is not null, we're viewing one comment and its children
              <IsolatedReply
                postId={data.id}
                replyId={reply}
                sort={sort}
                isReadOnly={readonly}
                isLoggedIn={!!user}
              />
            ) : (
              // if startingParent is null, we're viewing all top-level comments
              <TopLevelReplies
                postId={data.id}
                sort={sort}
                isReadOnly={readonly}
                isLoggedIn={!!user}
              />
            )}
          </div>
        </>
      </>
    );
}
