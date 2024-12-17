import { useState, useEffect } from "react";

import {
  type Reply as TReply,
  type VisibleReply,
  type HiddenReply,
} from "../../types";
import { Reply } from "./Reply";
import { LoadingSpacer } from "../LoadingSpacer";
import { useGet } from "../../hooks/useGet";

export function TopLevelReplies({
  postId,
  sort,
}: {
  postId: string;
  sort: string;
}) {
  const { loading, error, data, get } = useGet<
    TReply & { viewingAsMod: boolean }
  >(`/post/${postId}/replies?sort=${sort}`);

  useEffect(() => {
    get(false);
  }, [sort]);

  return (
    <>
      {(loading || error) && (
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Getting replies..."
        />
      )}
      {data && <NullParentReplies data={data} />}
    </>
  );
}
function NullParentReplies({ data }: { data: TReply }) {
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [children, setChildren] = useState<TReply[]>(data.children ?? []);

  const {
    loading,
    data: moreData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: TReply[];
  }>(nextUrl as string);

  useEffect(() => {
    if (nextUrl) {
      get(false);
    }
  }, [nextUrl]);

  useEffect(() => {
    if (moreData && moreData.children && nextUrl) {
      setChildren([...children, ...moreData.children]);
      setNextUrl(null);
    }
  }, [moreData]);

  return (
    <>
      {children.map((child) => (
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

      {(moreData ? moreData.loadMoreChildren : data.loadMoreChildren) && (
        <small className="reply-loadmore mt-1 mb-0-5">
          {loading ? (
            <span>Loading more replies...</span>
          ) : (
            <a
              onClick={() => {
                const loadMoreChildren = moreData
                  ? moreData.loadMoreChildren
                  : data.loadMoreChildren;
                if (loadMoreChildren) setNextUrl(loadMoreChildren);
              }}
              title={nextUrl ?? undefined}
            >
              Load more replies
            </a>
          )}
        </small>
      )}
    </>
  );
}
