import { useState } from "react";

import { doFetch } from "../functions/doFetch";
import { getStoredToken } from "../functions/tokenUtils";

export function useVote(opts: {
  endpoint: string;
  voted: { upvoted: boolean; downvoted: boolean } | null;
  canVote: boolean;
  score: number;
}) {
  const [voted, setVoted] = useState<{
    upvoted: boolean;
    downvoted: boolean;
  } | null>(opts.voted);
  const [loading, setLoading] = useState<boolean>(false);
  const [score, setScore] = useState<number>(opts.score);

  async function vote(type: "upvote" | "downvote", action: "add" | "remove") {
    const token = getStoredToken();
    if (
      !token || // no token
      voted === null || // there is no logged-in user
      opts.canVote === false // the content is readonly or hidden
      // in these cases, attempting to post is useless
    )
      return;

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
      console.error(postResult.error);
    }
    if (postResult.status === 200) {
      if (action === "add") {
        if (type === "upvote") {
          setVoted({ ...voted, upvoted: true });
          setScore(score + 1);
        }
        if (type === "downvote") {
          setVoted({ ...voted, downvoted: true });
          setScore(score - 1);
        }
      }
      if (action === "remove") {
        if (type === "upvote") {
          setVoted({ ...voted, upvoted: false });
          setScore(score - 1);
        }
        if (type === "downvote") {
          setVoted({ ...voted, downvoted: false });
          setScore(score + 1);
        }
      }
    }
  }

  return { loading, vote, voted, score };
}
