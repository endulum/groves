import { Link } from "react-router-dom";

import { type PinnedReply } from "../../../types";
import { MDWrapper } from "../../reusable/MDWrapper";
import { Username } from "../../reusable/Username";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { ReadMore } from "../../reusable/ReadMore";
import { PushPin } from "@mui/icons-material";
import { useContext } from "react";
import { PostContext } from "../post/PostContext";

export function PinnedReply({ data }: { data: PinnedReply }) {
  const { data: postData, getRole } = useContext(PostContext);
  if (data)
    return (
      <div className="pinned-reply p-0-75">
        <div className="flex-row jc-spb mb-0-5">
          <div className="flex-row gap-0-25">
            <PushPin style={{ width: "1rem" }} />
            <small>
              pinned reply by{" "}
              <Username
                user={data.author}
                role={getRole(data.author)}
                isOP={data.author.id === postData.author.id}
              />{" "}
              with{" "}
              <span>{data._count.upvotes - data._count.downvotes} points,</span>{" "}
              <DateWithTitle dateString={data.datePosted} />
            </small>
          </div>

          <Link
            type="button"
            className="button plain secondary"
            to={`/post/${postData.id}/reply/${data.id}`}
            title="View this post on its own"
          >
            <small>isolate</small>
          </Link>
        </div>
        <ReadMore link={`/post/${postData.id}/reply/${data.id}`}>
          <MDWrapper content={data.content} />
        </ReadMore>
      </div>
    );
}
