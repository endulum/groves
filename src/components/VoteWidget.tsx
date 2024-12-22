import {
  AddCircle,
  AddCircleOutline,
  RemoveCircle,
  RemoveCircleOutline,
  WbSunny,
  Loop,
} from "@mui/icons-material";
import { toast } from "react-toastify";

import { useVote } from "../hooks/useVote";
import { type VisibleReply, type Post } from "../types";

export function VoteWidget({
  data,
  type,
  canVote,
  orientation = "horizontal",
}: {
  data: VisibleReply | Post;
  type: "post" | "reply";
  canVote: boolean;
  orientation: "vertical" | "horizontal";
}) {
  const { loading, vote, voted, score } = useVote({
    endpoint: type === "post" ? `/post/${data.id}` : `/reply/${data.id}`,
    voted: data.voted,
    score: data._count.upvotes - data._count.downvotes,
    onError: (error: string) => {
      toast(<p>{error}</p>, {
        className: "custom-toast",
        type: "warning",
      });
    },
  });

  const getTitle = (
    voteType: "upvote" | "downvote",
    action: "add" | "remove"
  ) => {
    if (voted === null) return "You must be logged in to vote on content.";
    if (voteType === "upvote") {
      if (action === "add") {
        return voted.upvoted === true ? "You gave an upvote." : "Add an upvote";
      }
      if (action === "remove") {
        return voted.upvoted === false
          ? "You already voted."
          : "Remove your upvote";
      }
    }
    if (voteType === "downvote") {
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

  const getDisabled = (voteType: "upvote" | "downvote") => {
    if (
      voted === null ||
      // data.canVote === false ||
      (voteType === "upvote" && voted.downvoted === true) ||
      (voteType === "downvote" && voted.upvoted === true)
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
    <div
      className={`vote-widget ${
        orientation === "vertical" ? "flex-col" : "flex-row"
      } gap-0-25`}
      style={
        orientation === "horizontal" ? { flexDirection: "row-reverse" } : {}
      }
    >
      <button
        className="button plain"
        disabled={canVote ? getDisabled("upvote") : true}
        title={
          canVote
            ? getTitle(
                "upvote",
                voted?.upvoted || voted?.downvoted ? "remove" : "add"
              )
            : "Voting is disabled on readonly content."
        }
        onClick={() => {
          handleVote("upvote", voted?.upvoted ? "remove" : "add");
        }}
      >
        {voted?.upvoted ? <AddCircle /> : <AddCircleOutline />}
      </button>
      <div
        className={`${
          orientation === "vertical" ? "flex-row gap-0-5" : "flex-col gap-0-25"
        }`}
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
        disabled={canVote ? getDisabled("downvote") : true}
        title={
          canVote
            ? getTitle(
                "downvote",
                voted?.upvoted || voted?.downvoted ? "remove" : "add"
              )
            : "Voting is disabled on readonly content."
        }
        onClick={() => {
          handleVote("downvote", voted?.downvoted ? "remove" : "add");
        }}
      >
        {voted?.downvoted ? <RemoveCircle /> : <RemoveCircleOutline />}
      </button>
    </div>
  );
}
