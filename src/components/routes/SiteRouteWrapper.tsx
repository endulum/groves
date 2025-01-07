import { Link, Outlet } from "react-router-dom";
import { Forest, Login, Logout, Star } from "@mui/icons-material";

import { type UserData } from "../../types";
import { clearStoredToken } from "../../functions/tokenUtils";

export function SiteRouteWrapper({
  context,
}: {
  context: {
    user: UserData | null;
    initUser: () => Promise<void>;
    changeUsername: (username: string) => void;
  };
}) {
  return (
    <>
      <header>
        <div className="body flex-row jc-spb">
          <Link
            to={context.user ? "/feed" : "/"}
            className="logo flex-row gap-1"
          >
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
                <button
                  type="button"
                  className="button primary"
                  onClick={() => {
                    clearStoredToken();
                    context.initUser();
                  }}
                >
                  <Logout />
                  <span>Log out</span>
                </button>
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
          </nav>
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
