export type User = {
  username: string;
  id: number;
};

export type Post = {
  id: string;

  community: {
    id: number;
    urlName: string;
    canonicalName: string;
    moderators: number[];
    adminId: number;
  };

  author: {
    id: number;
    username: string;
  };

  title: string;
  content: string;
  datePosted: string;
  lastEdited: null | string;
};

export type Reply = {
  viewingAsMod: boolean;
  id: string;
  postId: string;
  parentId: string | null;
  canVote: boolean;
  children?: Reply[];
  loadChildren?: string;
  loadMoreChildren?: string;
};

export type VisibleReply = Reply & {
  hidden: false;

  author: {
    id: number;
    username: string;
  };

  _count: {
    upvotes: number;
    downvotes: number;
    children: number;
  };

  content: string;
  datePosted: string;

  voted: {
    upvoted: boolean;
    downvoted: boolean;
  } | null;
};

export type HiddenReply = Reply & {
  _count: {
    children: number;
  };
  hidden: true;
};

export type ReplyStatus = {
  replyParam?: string;
  isShaded: boolean;
  isMod: boolean;
  isTopLevel: boolean;
};
