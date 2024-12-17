import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";

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

export function PostRoute() {
  const navigate = useNavigate();
  const { post, reply } = useParams();
  const { user } = useOutletContext<{ user: User }>();
  const { loading, error, data } = useGet<Post>(`/post/${post}`);

  const [sort, setSort] = useState<string>("top");
  const [readonly, setReadonly] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);

  useEffect(() => {
    if (data) setReadonly(data.readonly);
  }, [data]);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post..."
      />
    );
  if (data)
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
              {data.lastEdited &&
                `, last edited ${DateTime.fromISO(
                  data.lastEdited
                ).toRelative()}`}
            </small>
            <h2>{data.title}</h2>
          </div>
          <VoteWidget data={data} type="post" orientation="horizontal" />
        </div>

        {readonly && (
          <Alert type="info" className="mt-1">
            <p>
              This post is frozen. It will not be found in community post
              search. Voting and replying is blocked.
            </p>
          </Alert>
        )}

        <div className="mb-1 mt-1">
          <MDWrapper content={data.content} />
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
        <div className="linkrow mt-0-5 flex-row gap-0-5">
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
