export type User = {
  username: string;
  id: number;
};

export type Reply = {
  author: {
    id: number;
    username: string;
  };
  _count: {
    upvotes: number;
    downvotes: number;
    children: number;
  };
  id: string;
  content: string;
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
};
