import { Air } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import { Search } from "../Search";
import { MDWrapper } from "../MDWrapper";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

type Result = {
  id: number;
  type: string;
  date: string;
  community: {
    id: number;
    urlName: string;
    canonicalName: string;
  };
};

type UserPost = Result & {
  reply: null;
  post: {
    id: string;
    title: string;
    content: string;
  };
};

type UserReply = Result & {
  post: null;
  reply: {
    id: string;
    post: {
      id: string;
      title: string;
    };
    content: string;
  };
};

export function UserActivity({ userId }: { userId: number }) {
  return (
    <Search<UserPost | UserReply>
      endpoint={`/user/${userId}/actions`}
      resultsPropertyName="actions"
      mapResults={(action: UserPost | UserReply) => {
        return (
          <div className="search-result">
            <p>
              <small>
                <span
                  title={DateTime.fromISO(action.date).toLocaleString(format)}
                >
                  {DateTime.fromISO(action.date).toRelative()}
                </span>
                , in{" "}
                <Link to={`/community/${action.community.urlName}`}>
                  {action.community.canonicalName}
                </Link>
                , wrote a{" "}
                {action.post ? (
                  <Link to={`/post/${action.post.id}`}>post</Link>
                ) : (
                  <Link
                    to={`/post/${action.reply.post.id}/reply/${action.reply.id}`}
                  >
                    reply
                  </Link>
                )}
              </small>
            </p>

            <MDWrapper
              content={action.post ? action.post.content : action.reply.content}
            />
          </div>
        );
        /* if (action.post) {
          return (
            <div className="search-result">
              <small>
                <span
                  title={DateTime.fromISO(action.date).toLocaleString(format)}
                >
                  {DateTime.fromISO(action.date).toRelative()}
                </span>
                , wrote a post in{" "}
                <Link to={`/community/${action.community.urlName}`}>
                  {action.community.canonicalName}
                </Link>
              </small>

              <p>
                <div className="content-preview mt-1">
                  <MDWrapper content={action.post.content} />
                </div>
              </p>
            </div>
          );
        }
        if (action.reply) {
          return <div className="search-result">
            <small>
                <span
                  title={DateTime.fromISO(action.date).toLocaleString(format)}
                >
                  {DateTime.fromISO(action.date).toRelative()}
                </span>
                , wrote a reply to{" "}
                <Link to={`/post/${action.reply.post.id}`}>
                  {action.community.canonicalName}
                </Link>
                {" "}in{" "}
                <Link to={`/community/${action.community.urlName}`}>
                  {action.community.canonicalName}
                </Link>
              </small>

              <p>
                <div className="content-preview mt-1">
                  <MDWrapper content={action.reply.content} />
                </div>
              </p>
          </div>;
        } */
      }}
      emptyElement={
        <div className="spacer">
          <Air />
          <p>This user hasn't made any content yet.</p>
        </div>
      }
    />
  );
}
