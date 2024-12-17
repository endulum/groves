import { Link, Outlet } from "react-router-dom";
import {
  Login,
  Logout,
  Star,
  Menu,
  AccountCircle,
  Forest,
  Explore,
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
          <div className="flex-row jc-spb">
            <Link to="/" className="logo flex-row gap-1">
              <Forest />
              <h1>{import.meta.env.VITE_APP_NAME}</h1>
            </Link>
            <nav className="flex-row gap-0-75">
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
                  <Link type="button" className="button primary" to="/login">
                    <Login />
                    <span>Log In</span>
                  </Link>
                  <Link type="button" className="button secondary" to="/signup">
                    <Star />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              <button
                type="button"
                className="button primary"
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
            <hr className="mt-1 mb-1" />
            {/* these can still be accessed in spacebar when hidden, disable that */}
            <ul className="flex-col align-start gap-0-25">
              <li>
                <Link
                  type="button"
                  className="button plain"
                  to="/communities"
                  onClick={onLinkClick}
                >
                  <Explore />
                  <span>Explore Communities</span>
                </Link>
              </li>

              {context.user ? (
                <>
                  <li>
                    <Link
                      type="button"
                      className="button plain"
                      to="/account"
                      onClick={onLinkClick}
                    >
                      <AccountCircle />
                      <span>Account</span>
                    </Link>
                  </li>
                  <li>
                    <a
                      type="button"
                      className="button plain"
                      href="/"
                      onClick={clearStoredToken}
                    >
                      <Logout />
                      <span>Log out</span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      type="button"
                      className="button plain"
                      onClick={onLinkClick}
                    >
                      <Login />
                      <span>Log in</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      type="button"
                      className="button plain"
                      onClick={onLinkClick}
                    >
                      <Star />
                      <span>Sign up</span>
                    </Link>
                  </li>
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
