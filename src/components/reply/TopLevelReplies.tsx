import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { Reply } from "./Reply";
import { LoadingSpacer } from "../LoadingSpacer";
import { useGet } from "../../hooks/useGet";

export function TopLevelReplies({ postId }: { postId: string }) {
  const { loading, error, data } = useGet<TReply & { viewingAsMod: boolean }>(
    `/post/${postId}/replies?sort=best&takePerLevel=2`
  );

  return (
    <>
      {(loading || error) && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Getting replies..."
        />
      )}
      {data &&
        data.children?.map((child) => (
          <Reply
            data={child as VisibleReply | HiddenReply}
            status={{
              isShaded: false,
              isMod: data.viewingAsMod,
              isTopLevel: true,
            }}
            key={child.id}
          />
        ))}
    </>
  );
}
