import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";

import { type Reply as TReply } from "../../types";
import { Reply } from "../Reply";

export function RepliesSubroute({ postId }: { postId: string }) {
  const { loading, error, data } = useGet<{
    loadMoreChildren: string | null;
    children: TReply[];
  }>(`/post/${postId}/replies?takePerLevel=2`);

  return (
    <>
      <h3 className="mt-1">Replies</h3>
      <div className="replies flex-col align-start gap-0-5">
        {!data ? (
          <LoadingSpacer loading={loading} error={error} />
        ) : (
          <>
            {data.children.map((child) => (
              <Reply
                data={child}
                shaded={false}
                firstLevel={true}
                key={child.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
