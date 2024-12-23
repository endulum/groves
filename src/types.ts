export type User = {
  username: string;
  id: number;
};

export type Community = {
  id: number;
  urlName: string;
  canonicalName: string;
  description: string;
  created: string;
  lastActivity: string;
  readonly: boolean;
  admin: User;
  moderators: User[];
  _count: {
    followers: number;
    posts: number;
  };
  following: boolean | null;
};

/*
{
  id: 2,
  urlName: 'askgroves',
  canonicalName: 'Ask Groves',
  description: 'This is the place to ask and answer thought-provoking questions.',
  created: '2024-12-22T03:08:40.105Z',
  lastActivity: '2024-12-22T03:08:40.105Z',
  readonly: false,
  admin: { id: 1, username: 'admin' },
  moderators: [],
  _count: { followers: 0, posts: 0 }
}
*/

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

  _count: {
    upvotes: number;
    downvotes: number;
    replies: number;
  };
  voted: {
    upvoted: boolean;
    downvoted: boolean;
  };
  canVote: boolean;

  title: string;
  content: string;
  datePosted: string;
  lastEdited: null | string;
  readonly: boolean;
  viewingAsMod: boolean;
};

// convenient object at base of json for
// `/post/___/replies`, `/reply/___`, and `/reply/___/replies`
// that lets us know what we can do to this reply
export type ReplyState = {
  isLoggedIn: boolean;
  isMod: boolean;
  isReadOnly: boolean;
};

// more convenient properties, but calculated clientside
export type ReplyStatus = ReplyState & {
  currentIsolatedReply: string | null; // is a reply being isolated?
  isTopLevel: boolean; // is current reply the top level?
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
  state: ReplyState;
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
  hidden: true;
  _count: {
    children: number;
  };
};
