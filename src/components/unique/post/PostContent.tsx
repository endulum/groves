/* import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { useBoolean } from "usehooks-ts";
import { toast } from "react-toastify";

import { type PostComponentContext, type Post } from "../../types";
import { VoteWidget } from "../VoteWidget";
import { Alert } from "../Alert";
import { PostEditForm } from "../all/PostEditForm";
import { ReplyForm } from "../all/ReplyForm";
import { FreezePost } from "../all/ModActionForms";
import { MDWrapper } from "../MDWrapper";
import { Username } from "../Username";

*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBoolean } from "usehooks-ts";
import { PushPin } from "@mui/icons-material";

import { type Post, type PostComponentContext } from "../../../types";
import { Username } from "../../reusable/Username";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { VoteWidget } from "../../reusable/VoteWidget";
import { Alert } from "../../reusable/Alert";
import { PostEditForm } from "../../forms/PostEditForm";
import { MDWrapper } from "../../reusable/MDWrapper";
import { ReplyForm } from "../../forms/ReplyForm";
import { FreezePostButton } from "../../forms/buttons/FreezePostButton";
import { PinPostButton } from "../../forms/buttons/PinPostButton";

export function PostContent({
  data,
  context,
  readonly,
  setReadonly,
}: // pinned,
// setPinned,
{
  data: Post;
  context: PostComponentContext;
  readonly: boolean;
  setReadonly: React.Dispatch<React.SetStateAction<boolean>>;
  // pinned: boolean;
  // setPinned: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const { value: pinned, setValue: setPinned } = useBoolean(data.pinned);

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
            <Username
              user={data.author}
              role={
                context.isPostAuthorMod
                  ? "mod"
                  : context.isPostAuthorAdmin
                  ? "admin"
                  : null
              }
            />{" "}
            <DateWithTitle dateString={data.datePosted} />
            {postContent.lastEdited && (
              <>
                , last edited{" "}
                <DateWithTitle dateString={postContent.lastEdited} />
              </>
            )}
          </small>
          {!editing && (
            <h2>
              {postContent.title}
              {pinned && (
                <span title="This post is pinned.">
                  {" "}
                  <PushPin
                    style={{ color: "var(--accent2)", verticalAlign: "middle" }}
                  />
                </span>
              )}
            </h2>
          )}
        </div>
        <VoteWidget
          data={data}
          context={context}
          type="post"
          isReadonly={readonly || context.isCommReadonly}
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

      {replying && context.authUserID && (
        <>
          <ReplyForm
            postId={data.id}
            parentId={null}
            onSuccess={(_submissionData, submissionResult) => {
              cancelReplying();
              navigate(
                `/post/${data.id}/reply/${
                  (submissionResult as { id: string }).id
                }`
              );
            }}
          />
        </>
      )}

      {!data.context.isCommReadonly && (
        <div className="linkrow flex-row gap-0-5 mt-1">
          {!readonly &&
            context.authUserID &&
            data.author.id === context.authUserID &&
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
            context.authUserID &&
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
            <>
              <FreezePostButton
                postId={data.id}
                readonly={readonly}
                setReadonly={setReadonly}
              />
              <PinPostButton
                postId={data.id}
                pinned={pinned}
                setPinned={setPinned}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
