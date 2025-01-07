import { Link } from "react-router-dom";
import { Explore } from "@mui/icons-material";
import { useDocumentTitle } from "usehooks-ts";

import { Feed } from "../unique/feed/Feed";

export function IndexGuestRoute() {
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
      <Feed type="global" />
    </>
  );
}
