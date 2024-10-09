import { useEffect, useRef, useState } from 'react';
import {
  Link, Outlet, useLocation,
} from 'react-router-dom';
// own imports
import { type User } from '../../types';
import { clearStoredToken } from '../../functions/tokenUtils';
import useOutsideClick from '../../hooks/useOutsideClick';
import Forest from '../../assets/svg/forest.svg?react';
import Close from '../../assets/svg/close.svg?react';
import Menu from '../../assets/svg/menu.svg?react';

export default function SiteWrapper({ user } : {
  user: User | null
}) {
  const location = useLocation();
  const header = useRef<HTMLDivElement>(null); // clicks outside here close the nav
  const menu = useRef<HTMLDivElement>(null); // we neeed a ref to menu to calculate its scrollHeight
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  useOutsideClick(header, () => { setMenuOpen(false); });

  useEffect(() => {
    setMenuOpen(false);
  }, [location]); // close menu if url changes

  return (
    <>
      <div className="fixed-header" ref={header}>
        <header>
          <div className="body header-body flex-row">
            <Link to="/" className="logo flex-row">
              <Forest />
              <h1>{import.meta.env.VITE_APP_NAME}</h1>
            </Link>
            <label className="menu-toggle" htmlFor="menu-toggle">
              <input
                type="checkbox"
                id="menu-toggle"
                checked={menuOpen}
                onChange={(e) => { setMenuOpen(e.target.checked); }}
                aria-label="Toggle menu"
              />
              <span>
                {menuOpen ? <Close /> : <Menu />}
              </span>
            </label>
          </div>
        </header>
        <nav
          ref={menu}
          className={menuOpen ? 'active' : ''}
          style={{
            height: menuOpen && menu.current
              ? `calc(${menu.current.scrollHeight}px + 1rem)`
              : '0px',
          }}
        >
          <div className="body nav-body flex-row">
            <Link to="/communities">Communities</Link>
            {user ? (
              <>
                <Link to="/account">Account Settings</Link>
                <a href="/" onClick={() => { clearStoredToken(); }}>
                  Log Out
                </a>
              </>
            ) : (
              <>
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <div className={`nav-overlay${menuOpen ? ' active' : ''}`} />
      <main>
        <div className="body main-body">
          <Outlet />
        </div>
      </main>
      <footer>
        <div className="footer-body body flex-col">
          <small>
            {import.meta.env.VITE_APP_NAME}
            {' '}
            &copy; endulum 2024, for The Odin Project.
          </small>
        </div>
      </footer>
    </>
  );
}
