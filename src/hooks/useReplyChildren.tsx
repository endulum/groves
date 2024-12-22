import { useState, useEffect } from "react";
import { Reply } from "../types";

import { useGet } from "./useGet";

export function useReplyChildren(data: Reply) {
  const [children, setChildren] = useState<Reply[]>(data.children ?? []);

  const [loadMoreChildren, setLoadMoreChildren] = useState<string | null>(
    data.loadMoreChildren ?? null
  );

  const [loadChildren, setLoadChildren] = useState<string | null>(
    data.loadChildren ?? null
  );

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const {
    loading,
    data: moreData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: Reply[];
  }>(nextUrl as string);

  const addNewChild = (newChild: Reply) => {
    setChildren([newChild, ...children]);
  };

  // will fetch more children when nextUrl is set
  useEffect(() => {
    if (nextUrl) get(false);
  }, [nextUrl]);

  useEffect(() => {
    // will add moreData's children to current children when fetch is done
    if (moreData && nextUrl) {
      setChildren([...children, ...moreData.children]);
      setLoadChildren(moreData.loadChildren);
      setLoadMoreChildren(moreData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [moreData]);

  return {
    loading,
    children,
    addNewChild,
    loadChildren,
    loadMoreChildren,
    setNextUrl,
  };
}
