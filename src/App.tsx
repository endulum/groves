import { Routes, Route, Navigate } from "react-router-dom";

import { LoadingSpacer } from "./components/LoadingSpacer";
import { SiteWrapper } from "./components/SiteWrapper";
import { useUser } from "./hooks/useUser";
import * as routes from "./components/routes/_index";

export function App() {
  const { loading, error, user, initUser, changeUsername } = useUser();

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;

  return (
    <Routes>
      <Route
        element={<SiteWrapper context={{ user, initUser, changeUsername }} />}
      >
        <Route path="/" element={<routes.IndexRoute />} />
        <Route path="/user/:user" element={<routes.UserRoute />} />
        <Route path="/communities" element={<routes.CommunitySearchRoute />} />
        <Route
          path="/community/:community"
          element={<routes.CommunityRoute />}
        />
        <Route
          path="/communities/new"
          element={<routes.CommunityCreateRoute />}
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
