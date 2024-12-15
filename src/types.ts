export type User = {
  username: string;
  id: number;
};

export type Reply = {
  postId: string;
  author: {
    id: number;
    username: string;
  } | null;
  _count: {
    upvotes: number;
    downvotes: number;
    children: number;
  };
  id: string;
  content: string | null;
  parentId: string;
  datePosted: string;
  voted: {
    upvoted: boolean;
    downvoted: boolean;
  } | null;
  canVote: boolean;
  children?: Reply[];
  loadChildren?: string;
  loadMoreChildren?: string;
  hidden: boolean;
};
