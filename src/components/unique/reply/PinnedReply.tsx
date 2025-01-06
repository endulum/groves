import { Link } from "react-router-dom";

import { type PostComponentContext, type VisibleReply } from "../../../types";
import { useGet } from "../../../hooks/useGet";
import { LoadingSpacer } from "../../reusable/LoadingSpacer";
import { MDWrapper } from "../../reusable/MDWrapper";
import { Username } from "../../reusable/Username";
import { DateWithTitle } from "../../reusable/DateWithTitle";
import { ReadMore } from "../../reusable/ReadMore";
import { PushPin } from "@mui/icons-material";

export function PinnedReply({
  postId,
  postContext,
}: {
  postId: string;
  postContext: PostComponentContext;
}) {
  const { loading, error, data } = useGet<VisibleReply>(
    `/post/${postId}/pinned`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting pinned reply..."
      />
    );

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
                role={
                  data.context.isReplyAuthorAdmin
                    ? "admin"
                    : data.context.isReplyAuthorMod
                    ? "mod"
                    : data.author.id === postContext.postAuthorID
                    ? "op"
                    : null
                }
              />{" "}
              with{" "}
              <span>{data._count.upvotes - data._count.downvotes} points,</span>{" "}
              <DateWithTitle dateString={data.datePosted} />
            </small>
          </div>

          <Link
            type="button"
            className="button plain secondary"
            to={`/post/${data.postId}/reply/${data.id}`}
            title="View this post on its own"
          >
            <small>isolate</small>
          </Link>
        </div>
        <ReadMore link={`/post/${postId}/reply/${data.id}`}>
          <MDWrapper content={data.content} />
        </ReadMore>
      </div>
    );
}
