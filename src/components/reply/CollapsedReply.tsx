import { ExpandMore } from "@mui/icons-material";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

import { type VisibleReply, type HiddenReply } from "../../types";

export function CollapsedReply({
  data,
  hidden,
  setCollapsed,
  childCount,
}: {
  data: VisibleReply | HiddenReply;
  hidden: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  childCount: number;
}) {
  return (
    <>
      {/* button */}
      <button
        className="button reply-collapse collapsed"
        title="Show reply tree"
        onClick={() => {
          setCollapsed(false);
        }}
      >
        <ExpandMore />
      </button>

      {/* content */}
      <div className="reply-content mb-0 collapsed">
        <small>
          {hidden ? (
            "hidden content, "
          ) : data.hidden ? (
            "unhidden content, "
          ) : (
            <>
              <Link to={`/user/${data.author.username}`}>
                {data.author.username}
              </Link>{" "}
              replied{" "}
              <span title={data.datePosted}>
                {DateTime.fromISO(data.datePosted).toRelative()}
              </span>{" "}
              with{" "}
              <span>{data._count.upvotes - data._count.downvotes} points,</span>
            </>
          )}{" "}
          <span>{`${childCount} ${
            childCount === 1 ? "child" : "children"
          }`}</span>
        </small>
      </div>
    </>
  );
}
