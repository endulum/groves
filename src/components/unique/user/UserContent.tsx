import { Link } from "react-router-dom";
import { Air } from "@mui/icons-material";

import { type UserData } from "../../../types";
import { Paginator } from "../../reusable/Paginator";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { ReadMore } from "../../reusable/ReadMore";
import { MDWrapper } from "../../reusable/MDWrapper";

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

export function UserContent({ data }: { data: UserData }) {
  return data._count.posts > 0 && data._count.replies > 0 ? (
    <>
      <h3 className="mt-1">Latest content</h3>
      <hr className="mt-1" />
      <Paginator<UserPost | UserReply>
        startingUrl={`/user/${data.username}/actions`}
        itemsPropertyName="actions"
        mapItems={(action) => {
          const link = action.post
            ? `/post/${action.post.id}`
            : `/post/${action.reply.post.id}/reply/${action.reply.id}`;
          return (
            <div className="search-result" key={action.id}>
              <p>
                <small>
                  wrote a{" "}
                  <Link to={link}>{action.post ? "post" : "reply"}</Link>{" "}
                  <DateWithTitle dateString={action.date} /> in{" "}
                  <Link to={`/community/${action.community.urlName}`}>
                    {action.community.canonicalName}
                  </Link>
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
        emptyElement={<p>This user hadn't made any content.</p>}
      />
    </>
  ) : (
    <>
      <hr className="mt-1 mb-1" />
      <div>
        <div className="spacer">
          <Air />
          <p>This user hasn't made any content yet.</p>
        </div>
      </div>
    </>
  );
}
