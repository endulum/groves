import { Link, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useGet } from "../../hooks/useGet";
import { useLogger } from "../../hooks/useLogger";
import { LoadingSpacer } from "../LoadingSpacer";
import { RepliesSubroute } from "./RepliesSubroute";

export function PostRoute() {
  const { post } = useParams();
  const { loading, error, data } = useGet<{
    community: {
      id: number;
      urlName: string;
      canonicalName: string;
    };
    author: {
      id: number;
      username: string;
    };
    title: string;
    id: string;
    content: string;
    datePosted: string;
    lastEdited: null | string;
  }>(`/post/${post}`);

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;
  if (data)
    return (
      <>
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
          {data.lastEdited &&
            `, edited ${DateTime.fromISO(data.lastEdited).toRelative()}`}
        </small>
        <h2>{data.title}</h2>
        <div className="post-content">
          <Markdown
            remarkPlugins={[remarkGfm]}
            allowedElements={[
              "a",
              "strong",
              "em",
              "del",
              "p",
              "br",
              "ul",
              "ol",
              "li",
              "img",
            ]}
            unwrapDisallowed
            skipHtml
            className="post-content"
          >
            {data.content.split("\n").join("  \n  \n")}
          </Markdown>
        </div>
        <hr />
        <RepliesSubroute postId={data.id} />
      </>
    );
}
