import { Link } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { useLogger } from "../../hooks/useLogger";
import { LoadingSpacer } from "../LoadingSpacer";

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
  children?: Reply[];
  loadChildren?: string;
  loadMoreChildren?: string;
}

export function RepliesSubroute({ postId }: { postId: string }) {
  const { loading, error, data } = useGet<{
    loadMoreChildren: string | null;
    children: Reply[];
  }>(`/post/${postId}/replies?takePerLevel=2&takeAtRoot=1`);

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
  return (
    <div
      className={`reply${shaded ? " shaded" : ""}${
        firstLevel ? " first-level" : ""
      }`}
    >
      <div className="reply-content">
        <small>
          by{" "}
          <Link to={`/user/${data.author.username}`}>
            {data.author.username}
          </Link>{" "}
          {DateTime.fromISO(data.datePosted).toRelative()}
        </small>
        <br />
        {data.content}
      </div>
      {data.children && data.children.length > 0 && (
        <>
          <div className="reply-children flex-col align-start gap-0-5">
            {data.children.map((child) => (
              <Reply
                data={child}
                shaded={!shaded}
                firstLevel={false}
                key={child.id}
              />
            ))}
          </div>
          {data.loadMoreChildren && (
            <small>
              <a href="#">Load more children...</a>
            </small>
          )}
        </>
      )}
      {data.loadChildren && (
        <small>
          <a href="#">Load children...</a>
        </small>
      )}
    </div>
  );
}
