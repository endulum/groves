import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { type Reply as TReply } from "../../types";
import { NullParentReplies } from "../Reply";

export function RepliesSubroute({
  postId,
  isMod,
}: {
  postId: string;
  isMod: boolean;
}) {
  const { loading, error, data } = useGet<TReply>(
    `/post/${postId}/replies?sort=best&takePerLevel=2`
  );

  return (
    <>
      <h3 className="mt-1">Replies</h3>
      <div className="replies flex-col align-start gap-0-5">
        {(loading || error) && (
          <LoadingSpacer
            loading={loading}
            error={error}
            customLoadingText="Getting replies..."
          />
        )}
        {data && <NullParentReplies data={data} isMod={isMod} />}
      </div>
    </>
  );
}
