import { useState, useEffect } from "react";
import { Air } from "@mui/icons-material";

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
  isReadOnly,
  isLoggedIn,
}: {
  postId: string;
  sort: string;
  isReadOnly: boolean;
  isLoggedIn: boolean;
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
      {data &&
        (data.children && data.children.length > 0 ? (
          <NullParentReplies
            data={data}
            isReadOnly={isReadOnly}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <div className="spacer">
            <Air />
            <p>
              This post doesn't have any replies yet. <br />
              Be the first to reply!
            </p>
          </div>
        ))}
    </>
  );
}
function NullParentReplies({
  data,
  isReadOnly,
  isLoggedIn,
}: {
  data: TReply;
  isReadOnly: boolean;
  isLoggedIn: boolean;
}) {
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
            isLoggedIn,
            isReadOnly,
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
