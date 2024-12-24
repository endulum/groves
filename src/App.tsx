import { Routes, Route, Navigate } from "react-router-dom";

import { LoadingSpacer } from "./components/LoadingSpacer";
import { SiteWrapper } from "./components/SiteWrapper";
import { useUser } from "./hooks/useUser";
import * as routes from "./components/routes/_index";

export function App() {
  const { loading, error, user, initUser, changeUsername } = useUser();

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
        element={<SiteWrapper context={{ user, initUser, changeUsername }} />}
      >
        <Route path="/" element={<routes.IndexRoute />} />
        <Route path="/user/:user" element={<routes.UserRoute />} />
        <Route path="/communities" element={<routes.CommunitySearchRoute />} />
        <Route
          path="/community/:community/"
          element={<routes.CommunityWrapper />}
        >
          <Route
            path="/community/:community/"
            element={<routes.CommunityPosts />}
          />
          <Route
            path="/community/:community/wiki"
            element={<routes.CommunityWiki />}
          />
        </Route>
        <Route path="/post/:post" element={<routes.PostRoute />} />
        {/* 
        <Route path="/post/:post/reply/:reply" element={<routes.PostRoute />} /> */}
        <Route
          path="/communities/new"
          element={<routes.CommunityCreateRoute />}
        />
        <Route
          path="/community/:community/newPost"
          element={<routes.PostCreateRoute />}
        />
        {user ? (
          <>
            <Route path="/account" element={<routes.AccountRoute />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<routes.LoginRoute />} />
            <Route path="/signup" element={<routes.SignupRoute />} />
          </>
        )}
        <Route path="*" element={<routes.ErrorRoute />} />
      </Route>
    </Routes>
  );
}
