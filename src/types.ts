export type User = {
  username: string,
  id: number
};

export type Communities = Array<{
  urlName: string,
  canonicalName: string,
  description: string,
  lastActivity: string,
  status: string,
  _count: {
    followers: number,
    posts: number
  }
}>;
