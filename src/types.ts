export type User = {
  username: string;
  id: number;
};

export type Community = {
  // top-level primitives
  id: number;
  urlName: string;
  canonicalName: string;
  description: string;
  created: string;
  lastActivity: string;
  readonly: boolean;
  // relational
  admin: User;
  moderators: User[];
  _count: { followers: number; posts: number };
  // context
  context: {
    isFollowing: boolean;
  };
};

type PostContext = {
  isVoted: { upvoted: boolean; downvoted: boolean };
  isMod: boolean;
  isPostAuthorMod: boolean;
  isPostAuthorAdmin: boolean;
  isCommReadonly: boolean;
};

export type Post = {
  // top-level primitives
  id: string;
  title: string;
  content: string;
  datePosted: string;
  lastEdited: string;
  pinned: boolean;
  readonly: boolean;
  // relational
  author: User;
  community: Pick<Community, "id" | "urlName" | "canonicalName">;
  _count: { upvotes: number; downvotes: number; replies: number };
  // context
  context: PostContext;
};

export type PostComponentContext = PostContext & {
  isPostReadonly: boolean;
  authUserID: number | null;
  postAuthorID: number;
  isolateReplyID: string | null;
};

type ReplyContext = {
  isVoted: { upvoted: boolean; downvoted: boolean };
  isReplyAuthorMod: boolean;
  isReplyAuthorAdmin: boolean;
};

export type Reply = {
  // top-level primitives
  id: string;
  parentId: string | null;
  postId: string;
  hidden: boolean;
  // children
  loadChildren?: string;
  loadMoreChildren?: string;
  children?: Reply[];
  // context
  context: ReplyContext;
};

export type ReplyComponentContext = PostComponentContext &
  ReplyContext & {
    isTopLevel: boolean;
  };

export type VisibleReply = Reply & {
  hidden: false;
  content: string;
  datePosted: string;
  _count: { upvotes: number; downvotes: number; children: number };
  author: User;
};

export type HiddenReply = Reply & {
  hidden: true;
  content: null;
  datePosted: null;
  _count: { upvotes: null; downvotes: null; children: number };
  author: null;
};
