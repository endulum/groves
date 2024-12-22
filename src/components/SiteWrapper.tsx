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
import { useBoolean } from "usehooks-ts";

import { type User } from "../types";
import { clearStoredToken } from "../functions/tokenUtils";
import { useRef } from "react";

export function SiteWrapper({
  context,
}: {
  context: {
    user: User | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  // const [expanded, setExpanded] = useState<boolean>(false);
  const { value: expanded, setFalse: collapse, toggle } = useBoolean(false);
  const headerList = useRef<HTMLDivElement>(null);

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
                onClick={toggle}
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
            <ul className="flex-col align-start gap-0-25 ">
              <li>
                <Link
                  type="button"
                  className="button plain"
                  to="/communities"
                  tabIndex={expanded ? 0 : -1}
                  onClick={collapse}
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
                      tabIndex={expanded ? 0 : -1}
                      onClick={collapse}
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
                      tabIndex={expanded ? 0 : -1}
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
                      tabIndex={expanded ? 0 : -1}
                      onClick={collapse}
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
                      tabIndex={expanded ? 0 : -1}
                      onClick={collapse}
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
