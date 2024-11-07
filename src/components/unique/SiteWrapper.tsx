import {
  Link, Outlet,
} from 'react-router-dom';

import { type User } from '../../types';
import { clearStoredToken } from '../../functions/tokenUtils';

export default function SiteWrapper({ user } : {
  user: User | null
}) {
  return (
    <>
      <header className='flex-row'>
        <Link to="/">
          <h1>{import.meta.env.VITE_APP_NAME}</h1>
        </Link>
        <div className='flex-row'>
          {user ? (
            <>
              <p>
                Logged in as
                {' '}
                <Link to={`/user/${user.username}`}>
                  {user.username}
                </Link>
              </p>
              <a href="/" onClick={() => clearStoredToken()}>Log out</a>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </header>
      <main className="flex-col">
        <Outlet />
      </main>
      <footer>
        <small>
          &copy; endulum, for The Odin Project
        </small>
      </footer>
    </>
  );
}
