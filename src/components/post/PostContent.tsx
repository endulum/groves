import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { DateTime } from "luxon";
import { useBoolean } from "usehooks-ts";
import { toast } from "react-toastify";

import { type Post, type User } from "../../types";
import { VoteWidget } from "../VoteWidget";
import { Alert } from "../Alert";
import { PostEditForm } from "../forms/PostEditForm";
import { ReplyForm } from "../reply/ReplyForm";
import { FreezePost } from "../forms/ModActionForms";
import { MDWrapper } from "../MDWrapper";

export function PostContent({ data }: { data: Post }) {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: User }>();
  const { value: readonly, setValue: setReadonly } = useBoolean(data.readonly);
  const {
    value: replying,
    setTrue: openReplying,
    setFalse: cancelReplying,
  } = useBoolean(false);
  const {
    value: editing,
    setTrue: openEditing,
    setFalse: cancelEditing,
  } = useBoolean(false);

  // because we can edit posts on the fly, set post content as state
  const [postContent, setPostContent] = useState<{
    title: string;
    content: string;
    lastEdited: string | null;
  }>({
    title: data.title,
    content: data.content,
    lastEdited: data.lastEdited,
  });

  return (
    <>
      <div className="flex-row jc-spb gap-0-5 align-start">
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
          isContentReadonly={data.readonly || data.context.isCommReadonly}
          orientation="horizontal"
        />
      </div>

      {data.context.isCommReadonly && (
        <Alert type="info" className="mt-1">
          <p>
            The community this post belongs to is frozen. Voting, replying, and
            editing are blocked.
          </p>
        </Alert>
      )}

      {readonly && (
        <Alert type="info" className="mt-1">
          <p>This post is frozen. Voting, replying, and editing are blocked.</p>
        </Alert>
      )}

      <div className="mb-1 mt-1">
        {editing ? (
          <PostEditForm
            data={data}
            setPostContent={setPostContent}
            cancelEditing={cancelEditing}
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
            toast(<p>New reply successfully created.</p>, {
              type: "success",
              className: "custom-toast",
            });
            cancelReplying();
            navigate(
              `/post/${data.id}/reply/${
                (submissionResult as { id: string }).id
              }`
            );
          }}
        />
      )}

      <div className="linkrow flex-row gap-0-5">
        {!readonly &&
          user &&
          data.author.id === user.id &&
          (editing ? (
            <button
              type="button"
              className="button plain secondary"
              onClick={cancelEditing}
            >
              <small style={{ color: "crimson" }}>cancel editing</small>
            </button>
          ) : (
            <button
              type="button"
              className="button plain secondary"
              onClick={openEditing}
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
              onClick={cancelReplying}
            >
              <small style={{ color: "crimson" }}>cancel replying</small>
            </button>
          ) : (
            <button
              type="button"
              className="button plain secondary"
              onClick={openReplying}
            >
              <small>reply</small>
            </button>
          ))}
        {data.context.isMod && (
          <FreezePost
            postId={data.id}
            readonly={readonly}
            setReadonly={setReadonly}
          />
        )}
      </div>
    </>
  );
}
