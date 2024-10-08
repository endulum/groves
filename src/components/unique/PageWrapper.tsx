import { Link, Outlet, useNavigate } from 'react-router-dom';
// own imports
import { type User } from '../../types';
import { clearStoredToken } from '../../functions/tokenUtils';

export default function PageWrapper({ user, initUser } : {
  user: User | null,
  initUser: () => void
}) {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h1>App</h1>
      </header>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                {' '}
                <Link to="/login">Log In</Link>
                {' '}
              </li>
              <li>
                {' '}
                <Link to="/signup">Sign Up</Link>
                {' '}
              </li>
            </>
          )}
        </ul>
        {user ? (
          <button
            type="button"
            onClick={() => {
              clearStoredToken();
              initUser();
              navigate('/');
            }}
          >
            Log out
          </button>
        ) : ''}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
