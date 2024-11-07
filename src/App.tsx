import {
  Routes, Route, Link, Navigate, useNavigate,
} from 'react-router-dom';

import useInitUser from './hooks/useInitUser';
import useLogger from './hooks/useLogger';

import LoadingWrapper from './components/reusable/LoadingWrapper';
import SiteWrapper from './components/unique/SiteWrapper';
import Account from './components/routes/Account';
import Login from './components/routes/Login';
import Signup from './components/routes/Signup';
import Index from './components/routes/Index';
import CommunityRoute from './components/routes/CommunityRoute';
import User from './components/routes/User';

import { setStoredToken } from './functions/tokenUtils';

export default function App() {
  const navigate = useNavigate();

  const {
    loading, error, user, setUser, initUser,
  } = useInitUser();

  useLogger(loading, error, user);

  if (loading === true || error !== null) {
    return <LoadingWrapper loading={loading} error={error} />;
  }

  return (
    <Routes>
      <Route element={<SiteWrapper user={user} />}>
        <Route path="/" element={<Index user={user} />} />
        <Route path="/communities" element={<CommunityRoute />} />
        <Route path="/user/:user" element={<User />} />
        {user ? (
          <>
            <Route path="/account" element={<Account user={user} setUser={setUser} />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={(
                <Login logIn={(token: string) => {
                  setStoredToken(token);
                  initUser();
                }}
                />
              )}
            />
            <Route
              path="/signup"
              element={(
                <Signup signUp={(username: string) => {
                  navigate('/login', {
                    state: { username },
                  });
                }}
                />
              )}
            />
          </>
        )}
        <Route
          path="*"
          element={(
            <>
              <p>There&apos;s nothing here...</p>
              <Link to="/">Go to index</Link>
            </>
          )}
        />
      </Route>
    </Routes>
  );
}
