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
      <header>
        <Link to="/">
          <h1>{import.meta.env.VITE_APP_NAME}</h1>
        </Link>
        {user ? (
          <p>
            Logged in as
            {' '}
            {user.username}
          </p>
        ) : (
          <p>
            Not logged in
          </p>
        )}
        <nav>
          <ul>
            {user ? (
              <>
                <li><Link to="/account">Account settings</Link></li>
                <li><a href="/" onClick={() => clearStoredToken()}>Log out</a></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
              </>
            )}
            <li><Link to="/communities">Explore communities</Link></li>
          </ul>
        </nav>
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
