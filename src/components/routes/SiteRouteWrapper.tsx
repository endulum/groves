import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Forest,
  Login,
  Star,
  DarkMode,
  LightMode,
  Close,
  AccountCircle,
  Explore,
  LocalLibrary,
  Menu,
} from "@mui/icons-material";

import { type UserData } from "../../types";
import { clearStoredToken } from "../../functions/tokenUtils";
import { getStoredTheme, storeTheme } from "../../functions/themeUtils";
import { useBoolean, useWindowSize } from "usehooks-ts";

export function SiteRouteWrapper({
  context,
}: {
  context: {
    user: UserData | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { value: isMobile, setValue: setIsMobile } = useBoolean(width <= 750);
  const { value: isMenuExpanded, setValue: setMenuExpanded } =
    useBoolean(false);
  const expandingMenu = useRef<HTMLDivElement>(null);

  const links = [
    {
      to: "/following",
      icon: <Forest />,
      text: "Following",
    },
    {
      to: "/explore",
      icon: <Explore />,
      text: "Explore",
    },
    {
      to: "/account",
      icon: <AccountCircle />,
      text: "Account",
    },
    {
      to: "/about",
      icon: <LocalLibrary />,
      text: "About",
    },
  ];

  const logOut = () => {
    clearStoredToken();
    context.initUser();
    navigate("/");
  };

  useEffect(() => {
    if (isMobile && width > 750) {
      setIsMobile(false);
      setMenuExpanded(false);
    }
    if (!isMobile && width <= 750) {
      setIsMobile(true);
    }
  }, [width]);
  return (
    <>
      <header className="dark">
        <div className="body flex-col gap-0-5">
          <div className="flex-row jc-spb w100 align-end">
            <Link
              to={context.user ? "/feed" : "/"}
              className="logo flex-row gap-1"
              onClick={() => {
                if (isMenuExpanded) setMenuExpanded(false);
              }}
            >
              <Forest />
              {!isMobile && <h1>{import.meta.env.VITE_APP_NAME}</h1>}
            </Link>
            <div className="flex-row gap-0-5">
              {!context.user && (
                <>
                  <Link type="button" className="button primary" to="/login">
                    {!isMobile && <Login />}
                    <span>Log In</span>
                  </Link>
                  <Link type="button" className="button secondary" to="/signup">
                    {!isMobile && <Star />}
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
              {isMobile && context.user && (
                <button
                  type="button"
                  className="button plain primary"
                  aria-controls="menu"
                  aria-expanded={isMenuExpanded ? "true" : "false"}
                  title={isMenuExpanded ? "Close menu" : "Open menu"}
                  onClick={() => {
                    setMenuExpanded(!isMenuExpanded);
                  }}
                >
                  {isMenuExpanded ? <Close /> : <Menu />}
                </button>
              )}
              <ThemeButton />
            </div>
          </div>
          {isMobile && context.user && (
            <div
              className="expanding-menu w100"
              ref={expandingMenu}
              style={{
                height: isMenuExpanded
                  ? `${expandingMenu.current?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="flex-col w100 gap-1">
                <div className="flex-row w100 jc-spb mt-0-5">
                  <p aria-hidden={!isMenuExpanded}>
                    Logged in as{" "}
                    <Link
                      to={`/user/${context.user.username}`}
                      tabIndex={isMenuExpanded ? undefined : -1}
                      onClick={(e) => {
                        e.currentTarget.blur();
                        setMenuExpanded(false);
                      }}
                    >
                      {context.user.username}
                    </Link>
                  </p>
                  <button
                    type="button"
                    className="button plain primary"
                    onClick={logOut}
                    tabIndex={isMenuExpanded ? undefined : -1}
                    aria-hidden={!isMenuExpanded}
                  >
                    <small>Log out</small>
                  </button>
                </div>
                <hr />
                <nav className="expanding-menu-links w100 flex-col gap-0-25">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      type="button"
                      className="button plain primary"
                      onClick={(e) => {
                        e.currentTarget.blur();
                        setMenuExpanded(false);
                      }}
                      tabIndex={isMenuExpanded ? undefined : -1}
                      aria-hidden={!isMenuExpanded}
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          )}
          {!isMobile && context.user && (
            <>
              <hr />
              <div className="flex-row jc-spb w100">
                <div className="flex-row gap-0-5">
                  <p>
                    Logged in as{" "}
                    <Link to={`/user/${context.user.username}`}>
                      {context.user.username}
                    </Link>
                  </p>
                  <button
                    type="button"
                    className="button plain primary"
                    onClick={logOut}
                  >
                    <small>Log out</small>
                  </button>
                </div>

                <nav className="flex-row">
                  {links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      type="button"
                      className="button plain primary"
                    >
                      {link.icon}
                      <span>{link.text}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </>
          )}
        </div>
      </header>

      <main>
        <div className="body">
          <Outlet context={context} />
        </div>
      </main>

      <footer>
        <div className="body">
          <small>
            &copy; endulum, for The Odin Project.
            <a href="https://dinpattern.com/" target="_blank">
              DinPattern
            </a>
          </small>
        </div>
      </footer>
    </>
  );
}

function ThemeButton() {
  const [theme, setTheme] = useState<string>(getStoredTheme());

  return (
    <button
      type="button"
      className="button primary"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        storeTheme(newTheme);
        setTheme(newTheme);
      }}
    >
      {theme === "light" && <DarkMode />}
      {theme === "dark" && <LightMode />}
    </button>
  );
}
