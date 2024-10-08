import {
  Routes, Route, Link, Navigate, useNavigate,
} from 'react-router-dom';
// own imports
import useInitUser from './hooks/useInitUser';
import LoadingWrapper from './components/reusable/LoadingWrapper';
import PageWrapper from './components/unique/PageWrapper';
import Index from './components/routes/Index';
import Login from './components/routes/Login';
import Signup from './components/routes/Signup';
import Account from './components/routes/Account';
import { setStoredToken } from './functions/tokenUtils';

export default function App() {
  const navigate = useNavigate();
  const {
    loading, error, user, initUser,
  } = useInitUser();

  if (loading || error !== null) {
    return <LoadingWrapper loading={loading} error={error} />;
  }

  return (
    <Routes>
      <Route element={<PageWrapper user={user} initUser={initUser} />}>
        <Route path="/" element={<Index user={user} />} />
        {user ? (
          <>
            <Route path="/account" element={<Account currentUsername={user.username} />} />
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
