// wrappers

export { SiteRouteWrapper } from "./SiteRouteWrapper";
export { CommunityRouteWrapper } from "./CommunityRouteWrapper";
export { IndexRouteWrapper } from "./IndexRouteWrapper";
export { GlobalFeedRoute, PersonalFeedRoute } from "./FeedRoutes";

// routes

export { IndexGuestRoute } from "./IndexGuestRoute"; // /

export { ErrorRoute } from "./ErrorRoute"; // *

export { LoginRoute } from "./LoginRoute"; // /login
export { SignupRoute } from "./SignupRoute"; // /signup

export { UserRoute } from "./UserRoute"; // /user/:user
export { AccountRoute } from "./AccountRoute"; // /account
export { ExploreRoute } from "./ExploreRoute"; // /explore
export { CommunityCreateRoute } from "./CommunityCreateRoute"; // /new

export { CommunityPostsRoute } from "./CommunityPostsRoute"; // /community/:community
export { CommunityWikiRoute } from "./CommunityWikiRoute"; // /community/:community/wiki
export { CommunityActivityRoute } from "./CommunityActivityRoute"; // /community/:community/activity
export { CommunityModerationRoute } from "./CommunityModerationRoute"; // /community/:community/moderation
export { PostCreateRoute } from "./PostCreateRoute"; // /community/:community/new
export { CommunityErrorRoute } from "./CommunityErrorRoute"; // /community/:community/*

export { PostRoute } from "./PostRoute"; // /post/:post

export { AboutRoute } from "./AboutRoute";
export { FollowingRoute } from "./FollowingRoute";
export { GithubRoute } from "./GithubRoute";
