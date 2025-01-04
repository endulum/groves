import { Link } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";
import { Explore } from "@mui/icons-material";

import { GlobalFeed } from "../unique/feed/GlobalFeed";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Home</h2>
        <Link to="/explore" type="button" className="button primary">
          <Explore />
          <span>Explore</span>
        </Link>
      </div>

      <h3>Global feed</h3>
      <hr className="mt-0-5" />
      <GlobalFeed />
    </>
  );
}
