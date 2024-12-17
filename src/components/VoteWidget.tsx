import {
  AddCircle,
  AddCircleOutline,
  RemoveCircle,
  RemoveCircleOutline,
  WbSunny,
  Loop,
} from "@mui/icons-material";

import { useVote } from "../hooks/useVote";
import { type VisibleReply } from "../types";

export function VoteWidget({ data }: { data: VisibleReply }) {
  const { loading, vote, voted, score } = useVote({
    endpoint: `/reply/${data.id}`,
    voted: data.voted,
    score: data._count.upvotes - data._count.downvotes,
  });

  const getTitle = (type: "upvote" | "downvote", action: "add" | "remove") => {
    if (data.canVote === false)
      return "Voting is disabled on readonly or hidden content.";
    if (voted === null) return "You must be logged in to vote on content.";
    if (type === "upvote") {
      if (action === "add") {
        return voted.upvoted === true ? "You gave an upvote." : "Add an upvote";
      }
      if (action === "remove") {
        return voted.upvoted === false
          ? "You already voted."
          : "Remove your upvote";
      }
    }
    if (type === "downvote") {
      if (action === "add") {
        return voted.downvoted === true
          ? "You gave a downvote."
          : "Add a downvote";
      }
      if (action === "remove") {
        return voted.downvoted === false
          ? "You already voted."
          : "Remove your downvote";
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

  const { upvotes, downvotes } = data._count;

  return (
    <div className="vote-widget flex-col gap-0-25">
      <button
        className="button plain"
        disabled={getDisabled("upvote")}
        title={getTitle(
          "upvote",
          voted?.upvoted || voted?.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote("upvote", voted?.upvoted ? "remove" : "add");
        }}
      >
        {voted?.upvoted ? <AddCircle /> : <AddCircleOutline />}
      </button>
      <div
        className="flex-row gap-0-5"
        title={
          loading
            ? "Casting vote..."
            : `${upvotes} upvotes, ${downvotes} downvotes`
        }
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
        disabled={getDisabled("downvote")}
        title={getTitle(
          "downvote",
          voted?.upvoted || voted?.downvoted ? "remove" : "add"
        )}
        onClick={() => {
          handleVote("downvote", voted?.downvoted ? "remove" : "add");
        }}
      >
        {voted?.downvoted ? <RemoveCircle /> : <RemoveCircleOutline />}
      </button>
    </div>
  );
}
