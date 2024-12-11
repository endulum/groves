import { Link, Outlet } from "react-router-dom";
import {
  Diversity3,
  Login,
  Logout,
  Star,
  Menu,
  AccountCircle,
} from "@mui/icons-material";

import { type User } from "../types";
import { clearStoredToken } from "../functions/tokenUtils";
import { useRef, useState } from "react";

export function SiteWrapper({
  context,
}: {
  context: {
    user: User | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const headerList = useRef<HTMLDivElement>(null);

  const onLinkClick = () => setExpanded(false);
  return (
    <>
      <header>
        <div className="body">
          <div className="header-top">
            <Link to="/" className="logo">
              <Diversity3 />
              <h1>{import.meta.env.VITE_APP_NAME}</h1>
            </Link>
            <nav>
              {context.user ? (
                <>
                  <p>
                    Logged in as{" "}
                    <Link to={`/user/${context.user.username}`}>
                      {context.user.username}
                    </Link>
                  </p>
                </>
              ) : (
                <>
                  <Link type="button" className="button" to="/login">
                    <Login />
                    <span>Log In</span>
                  </Link>
                  <Link type="button" className="button" to="/signup">
                    <Star />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              <button
                type="button"
                className="button"
                aria-controls="menu"
                aria-expanded={expanded ? "true" : "false"}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                <Menu />
              </button>
            </nav>
          </div>
          <div
            ref={headerList}
            className="header-list"
            style={{
              height: expanded
                ? `${headerList.current?.scrollHeight}px`
                : "0px",
            }}
          >
            <hr />
            <ul>
              {context.user ? (
                <>
                  <Link to="/account" onClick={onLinkClick}>
                    <li>
                      <AccountCircle />
                      <span>Account</span>
                    </li>
                  </Link>
                  <a href="/" onClick={clearStoredToken}>
                    <li>
                      <Logout />
                      <span>Log out</span>
                    </li>
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={onLinkClick}>
                    <li>
                      <Login />
                      <span>Log in</span>
                    </li>
                  </Link>
                  <Link to="/signup" onClick={onLinkClick}>
                    <li>
                      <Star />
                      <span>Sign up</span>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>

      <main>
        <div className="body">
          <Outlet context={context} />
        </div>
      </main>

      <footer>
        <div className="body">
          <small>&copy; endulum, for The Odin Project</small>
        </div>
      </footer>
    </>
  );
}
