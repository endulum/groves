import { createContext, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { type PostWithMeta, type PinnedReply, User } from "../../../types";

type Context = {
  data: PostWithMeta;
  pinning: {
    pinned: boolean;
    unpin: () => void;
    pin: () => void;
  };
  freezing: {
    frozen: boolean;
    unfreeze: () => void;
    freeze: () => void;
  };
  pinnedReply: PinnedReply;
  setPinnedReply: React.Dispatch<React.SetStateAction<PinnedReply>>;
  getRole: (user: User) => "admin" | "mod" | null;
  isolateReplyID: string | undefined;
};

const PostContext = createContext({} as Context);

const PostContextProvider = ({
  children,
  data,
  replyId,
}: {
  children: React.ReactNode;
  data: PostWithMeta;
  replyId: string | undefined;
}) => {
  const {
    value: pinned,
    setFalse: unpin,
    setTrue: pin,
  } = useBoolean(data.pinned);

  const {
    value: frozen,
    setFalse: unfreeze,
    setTrue: freeze,
  } = useBoolean(data.readonly);

  const [pinnedReply, setPinnedReply] = useState<PinnedReply>(data.pinnedReply);

  const getRole = (user: User): "admin" | "mod" | null => {
    if (!user) return null;
    if (user.id === data.community.admin.id) return "admin";
    if (data.community.moderators.map((m) => m.id).includes(user.id))
      return "mod";
    return null;
  };

  return (
    <PostContext.Provider
      value={{
        data,
        pinning: { pinned, pin, unpin },
        freezing: { frozen, freeze, unfreeze },
        pinnedReply,
        setPinnedReply,
        getRole,
        isolateReplyID: replyId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostContextProvider };
