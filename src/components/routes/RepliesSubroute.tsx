import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import {
  AddCircle,
  AddCircleOutline,
  RemoveCircle,
  RemoveCircleOutline,
  WbSunny,
  Loop,
} from "@mui/icons-material";

import { useGet } from "../../hooks/useGet";
import { useLogger } from "../../hooks/useLogger";
import { LoadingSpacer } from "../LoadingSpacer";
import { useEffect, useState } from "react";

import { useVote } from "../../hooks/useVote";

interface Reply {
  author: {
    id: number;
    username: string;
  };
  _count: {
    upvotes: number;
    downvotes: number;
    children: number;
  };
  id: string;
  content: string;
  parentId: string;
  datePosted: string;
  voted: {
    upvoted: boolean;
    downvoted: boolean;
  } | null;
  canVote: boolean;
  children?: Reply[];
  loadChildren?: string;
  loadMoreChildren?: string;
}

export function RepliesSubroute({ postId }: { postId: string }) {
  const { loading, error, data } = useGet<{
    loadMoreChildren: string | null;
    children: Reply[];
  }>(`/post/${postId}/replies`);

  useLogger({ data });

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;
  if (data)
    return (
      <div className="replies flex-col align-start gap-0-5">
        {data.children.map((child) => (
          <Reply data={child} shaded={false} firstLevel={true} key={child.id} />
        ))}
      </div>
    );
}

function Reply({
  data,
  shaded,
  firstLevel,
}: {
  data: Reply;
  shaded: boolean;
  firstLevel: boolean;
}) {
  const [loadChildren, setLoadChildren] = useState<string | null>(
    data.loadChildren ?? null
  );

  const [loadMoreChildren, setLoadMoreChildren] = useState<string | null>(
    data.loadMoreChildren ?? null
  );

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const [replyChildren, setReplyChildren] = useState<Reply[]>(
    data.children ?? []
  );

  const {
    loading,
    data: childrenData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: Reply[];
  }>(nextUrl as string); // somehow assert that we'll only call this when the string is set

  useEffect(() => {
    get(false);
  }, [nextUrl]);

  useEffect(() => {
    if (childrenData) {
      setReplyChildren([...replyChildren, ...childrenData.children]);
      setLoadChildren(childrenData.loadChildren);
      setLoadMoreChildren(childrenData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [childrenData]);

  const clickToLoadMoreChildren = () => {
    setNextUrl(loadMoreChildren);
  };

  const clickToLoadChildren = () => {
    setNextUrl(loadChildren);
  };

  return (
    <div
      className={`reply${shaded ? " shaded" : ""}${
        firstLevel ? " first-level" : ""
      }`}
      id={data.id}
    >
      <div className="reply-content flex-row gap-1">
        <VoteWidget data={data} />
        <div>
          <small>
            by{" "}
            <Link to={`/user/${data.author.username}`}>
              {data.author.username}
            </Link>{" "}
            {DateTime.fromISO(data.datePosted).toRelative()}
          </small>
          <br />
          {data.content}
          <br />
          <small>
            <a href={`#${data.parentId}`}>parent</a>
          </small>
        </div>
      </div>

      {replyChildren.length > 0 && (
        <>
          <div className="reply-children flex-col align-start gap-0-5">
            {replyChildren.map((child) => (
              <Reply
                data={child}
                shaded={!shaded}
                firstLevel={false}
                key={child.id}
              />
            ))}
          </div>
          {loadMoreChildren && (
            <small>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <a
                  className="reply-loadmore"
                  onClick={clickToLoadMoreChildren}
                  title={loadMoreChildren}
                >
                  Load more replies
                </a>
              )}
            </small>
          )}
        </>
      )}
      {loadChildren && (
        <small>
          {loading ? (
            <span>Loading...</span>
          ) : (
            <a
              className="reply-loadmore"
              onClick={clickToLoadChildren}
              title={loadChildren}
            >
              Load replies
            </a>
          )}
        </small>
      )}
    </div>
  );
}

function VoteWidget({ data }: { data: Reply }) {
  const { loading, vote, voted, score } = useVote({
    endpoint: `/reply/${data.id}`,
    voted: data.voted,
    canVote: data.canVote,
    score: data._count.upvotes - data._count.downvotes,
  });

  /*

  cases:
  - voted = null
    = both buttons grayed out, "You must log in to vote on content."
  - voted != null, canVote = false
    = both buttons grayed out, "Voting is disabled for read-only content."
  - voted === { upvoted: false, downvoted: false }
    = both buttons open, can only add vote
  - voted === { upvoted: true, downvoted: false }
    = the button of the vote you cast is open, can only remove vote
    = the button of the other vote is grayed out

  */

  const getTitle = (type: "upvote" | "downvote", action: "add" | "remove") => {
    if (voted === null) return "You must be logged in to vote on content.";
    if (data.canVote === false)
      return "Voting is disabled on readonly content.";
    if (type === "upvote") {
      if (action === "add") {
        return voted.upvoted === true
          ? "You gave an upvote."
          : "Upvote this post";
      }
      if (action === "remove") {
        return voted.upvoted === false
          ? "You already voted."
          : "Remove your upvote from this post";
      }
    }
    if (type === "downvote") {
      if (action === "add") {
        return voted.downvoted === true
          ? "You gave a downvote."
          : "Downvote this post";
      }
      if (action === "remove") {
        return voted.downvoted === false
          ? "You already voted."
          : "Remove your downvote from this post";
      }
    }
  };

  const getDisabled = (type: "upvote" | "downvote") => {
    if (
      voted === null ||
      data.canVote === false ||
      (type === "upvote" && voted.downvoted === true) ||
      (type === "downvote" && voted.upvoted === true)
    )
      return true;
    return false;
  };

  const handleVote = (
    type: "upvote" | "downvote",
    action: "add" | "remove"
  ) => {
    if (voted === null) return;
    if (data.canVote === false) return;
    vote(type, action);
  };

  return (
    <div className="vote-widget flex-col gap-0-25">
      <button
        className="button plain"
        /* disabled={getDisabled("upvote")} */
        title={getTitle(
          "upvote",
          voted?.upvoted || voted?.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote(
            "upvote",
            voted?.upvoted || voted?.downvoted ? "remove" : "add"
          );
        }}
      >
        {voted?.upvoted ? <AddCircle /> : <AddCircleOutline />}
        {/* <KeyboardArrowUp /> */}
      </button>
      <div
        className="flex-row gap-0-5"
        title={`${data._count.upvotes} upvotes, ${data._count.downvotes} downvotes`}
      >
        {loading ? (
          <Loop className="spin" style={{ width: "1.25rem" }} />
        ) : (
          <WbSunny style={{ width: "1.25rem", color: "var(--accent2)" }} />
        )}
        <small>{score}</small>
      </div>
      <button
        className="button plain"
        /* disabled={getDisabled("downvote")} */
        title={getTitle(
          "downvote",
          voted?.upvoted || voted?.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote(
            "downvote",
            voted?.upvoted || voted?.downvoted ? "remove" : "add"
          );
        }}
      >
        {voted?.downvoted ? <RemoveCircle /> : <RemoveCircleOutline />}
        {/* <KeyboardArrowDown /> */}
      </button>
    </div>
  );
}
