export type User = {
  username: string;
  id: number;
};

export type UserData = User & {
  joined: string;
  bio: string;
  githubId: string | null;
  githubUser: string | null;
  _count: {
    posts: number;
    replies: number;
  };
  verdancy: {
    postVerdancy: number;
    replyVerdancy: number;
  };
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
  _count: { followers: number; posts: number; pinnedPosts: number };
  // meta
  meta: {
    isFollowing: boolean;
  };
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
  // meta
  meta: {
    isVoted: { upvoted: boolean; downvoted: boolean };
  };
};

export type Reply = {
  // top-level primitives
  id: string;
  parentId: string | null;
  postId: string;
  hidden: boolean;
  pinned: boolean;
  // children
  loadChildren?: string;
  loadMoreChildren?: string;
  children?: Reply[];
  meta: {
    isVoted: { upvoted: boolean; downvoted: boolean };
  };
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

export type PinnedReply = {
  id: string;
  author: { id: number; username: string };
  datePosted: string;
  content: string;
  _count: {
    upvotes: number;
    downvotes: number;
  };
} | null;

export type PostWithMeta = Post & {
  community: Pick<
    Community,
    "id" | "urlName" | "canonicalName" | "moderators" | "admin" | "readonly"
  >;
  pinnedReply: PinnedReply;
};
