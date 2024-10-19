export type User = {
  username: string,
  id: number,
  bio: string
};

export type Community = {
  id: string,
  urlName: string,
  canonicalName: string,
  description: string,
  created: string,
  lastActivity: string,
  _count: {
    followers: number,
    posts: number
  }
};
