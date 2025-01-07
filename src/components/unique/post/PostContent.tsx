import { useState, useContext } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import { type User } from "../../../types";
import { PostContext } from "./PostContext";
import { PushPin } from "@mui/icons-material";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { Username } from "../../reusable/Username";
import { VoteWidget } from "../../reusable/VoteWidget";
import { Alert } from "../../reusable/Alert";
import { PostEditForm } from "../../forms/PostEditForm";
import { MDWrapper } from "../../reusable/MDWrapper";
import { ReplyForm } from "../../forms/ReplyForm";
import { FreezePostButton } from "../../forms/buttons/FreezePostButton";
import { PinPostButton } from "../../forms/buttons/PinPostButton";

export function PostContent() {
  const navigate = useNavigate();

  const { user } = useOutletContext<{ user: User }>();
  const { data, pinning, freezing, getRole } = useContext(PostContext);

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
            by <Username user={data.author} role={getRole(data.author)} />{" "}
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
              {pinning.pinned && (
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
        <VoteWidget data={data} type="post" />
      </div>

      {data.community.readonly && (
        <Alert type="info" className="mt-1">
          <p>
            The community this post belongs to is frozen. Voting, replying, and
            editing are blocked.
          </p>
        </Alert>
      )}

      {freezing.frozen && (
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

      {!data.community.readonly && (
        <div className="linkrow flex-row gap-0-5 mt-1">
          {!freezing.frozen &&
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
          {!freezing.frozen &&
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
          {getRole(user) !== null && (
            <>
              <FreezePostButton />
              <PinPostButton />
            </>
          )}
        </div>
      )}
    </>
  );
}
