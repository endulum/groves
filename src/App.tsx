import { Routes, Route, Navigate } from "react-router-dom";

import { useUser } from "./hooks/useUser";
import { LoadingSpacer } from "./components/reusable/LoadingSpacer";
import * as routes from "./components/routes/_index";
import { setStoredTheme } from "./functions/themeUtils";
import { useEffect } from "react";

export function App() {
  const { loading, error, user, initUser, changeUsername } = useUser();

  useEffect(() => {
    setStoredTheme();
  }, []);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Starting up..."
      />
    );

  return (
    <Routes>
      <Route
        element={
          <routes.SiteRouteWrapper
            context={{ user, initUser, changeUsername }}
          />
        }
      >
        {user ? (
          <>
            <Route path="/" element={<routes.IndexRouteWrapper />}>
              <Route path="/" element={<Navigate to="/feed" />} />
              <Route path="/feed" element={<routes.PersonalFeedRoute />} />
              <Route path="/all" element={<routes.GlobalFeedRoute />} />
            </Route>
            <Route path="/following" element={<routes.FollowingRoute />} />
            <Route path="/account" element={<routes.AccountRoute />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<routes.IndexGuestRoute />} />
            <Route path="/feed" element={<Navigate to="/" />} />
            <Route path="/all" element={<Navigate to="/" />} />
            <Route path="/following" element={<Navigate to="/" />} />
            <Route path="/login" element={<routes.LoginRoute />} />
            <Route path="/signup" element={<routes.SignupRoute />} />
            <Route path="/github" element={<routes.GithubRoute />} />
          </>
        )}

        <Route path="/user/:user" element={<routes.UserRoute />} />
        <Route path="/explore" element={<routes.ExploreRoute />} />
        <Route path="/new" element={<routes.CommunityCreateRoute />} />

        {/* community */}
        <Route
          path="/community/:community/"
          element={<routes.CommunityRouteWrapper />}
        >
          <Route
            path="/community/:community/"
            element={<routes.CommunityPostsRoute />}
          />
          <Route
            path="/community/:community/wiki"
            element={<routes.CommunityWikiRoute />}
          />
          <Route
            path="/community/:community/activity"
            element={<routes.CommunityActivityRoute />}
          />
          <Route
            path="/community/:community/moderation"
            element={<routes.CommunityModerationRoute />}
          />
          <Route
            path="/community/:community/*"
            element={<routes.CommunityErrorRoute />}
          />
        </Route>
        <Route
          path="/community/:community/new"
          element={<routes.PostCreateRoute />}
        />

        {/* post */}
        <Route path="/post/:post" element={<routes.PostRoute />} />
        <Route path="/post/:post/reply/:reply" element={<routes.PostRoute />} />

        {/* etc */}
        <Route path="/about" element={<routes.AboutRoute />} />

        <Route path="*" element={<routes.ErrorRoute />} />
      </Route>
    </Routes>
  );
}
