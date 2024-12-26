import { useState } from "react";

import { doFetch } from "../functions/doFetch";
import { getStoredToken } from "../functions/tokenUtils";

export function useVote(opts: {
  endpoint: string;
  isVoted: { upvoted: boolean; downvoted: boolean };
  score: { upvotes: number; downvotes: number };
  onError: (error: string) => void;
}) {
  const [isVoted, setIsVoted] = useState<{
    upvoted: boolean;
    downvoted: boolean;
  }>(opts.isVoted);
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<{ upvotes: number; downvotes: number }>(
    opts.score
  );

  async function vote(type: "upvote" | "downvote", action: "add" | "remove") {
    const token = getStoredToken();
    if (!token) return;

    setLoading(true);
    const postResult = await doFetch(`${opts.endpoint}/vote`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        type,
        action,
      }),
    });
    setLoading(false);
    if (postResult.error) {
      opts.onError(postResult.error);
    }
    if (postResult.status === 200) {
      if (action === "add") {
        if (type === "upvote") {
          setIsVoted({ ...isVoted, upvoted: true });
          setScore({ ...score, upvotes: score.upvotes + 1 });
        }
        if (type === "downvote") {
          setIsVoted({ ...isVoted, downvoted: true });
          setScore({ ...score, downvotes: score.downvotes + 1 });
        }
      }
      if (action === "remove") {
        if (type === "upvote") {
          setIsVoted({ ...isVoted, upvoted: false });
          setScore({ ...score, upvotes: score.upvotes - 1 });
        }
        if (type === "downvote") {
          setIsVoted({ ...isVoted, downvoted: false });
          setScore({ ...score, downvotes: score.downvotes - 1 });
        }
      }
    }
  }

  return { loading, vote, isVoted, score };
}
