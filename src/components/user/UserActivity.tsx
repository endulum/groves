import { Air } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime, type DateTimeFormatOptions } from "luxon";

import { Search } from "../Search";
import { MDWrapper } from "../MDWrapper";
import { ReadMore } from "../ReadMore";

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
        const link = action.post
          ? `/post/${action.post.id}`
          : `/post/${action.reply.post.id}/reply/${action.reply.id}`;
        return (
          <div className="search-result" key={action.id}>
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
                <Link to={link}>{action.post ? "post" : "reply"}</Link>
              </small>
            </p>

            <ReadMore link={link}>
              <MDWrapper
                content={
                  action.post ? action.post.content : action.reply.content
                }
              />
            </ReadMore>
          </div>
        );
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
