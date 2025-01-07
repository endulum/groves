import { Link } from "react-router-dom";
import { Explore, Forest, LocalLibrary } from "@mui/icons-material";
import { useDocumentTitle } from "usehooks-ts";

import { Feed } from "../unique/feed/Feed";

export function IndexGuestRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="cta mb-1">
        <div className="cta-top" />
        <div className="cta-bottom flex-col align-start jcc">
          <h2>Share what matters to you</h2>
          <p className="mb-1">
            Explore and cultivate communities centered around any and every
            interest under the sun, engaging in vibrant, flourishing discussion.
            Grow your bonds at Groves.
          </p>
          <div className="cta-buttons flex-row gap-1 mt-1">
            <Link type="button" className="button secondary" to="signup">
              <Forest />
              <span>Join today</span>
            </Link>
            <Link type="button" className="button primary" to="about">
              <LocalLibrary />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <div className="flex-row jc-spb mb-1 align-end">
        <h2 style={{ lineHeight: "2rem" }}>Hottest on Groves</h2>
        <Link to="/explore" type="button" className="button primary">
          <Explore />
          <span>Explore</span>
        </Link>
      </div>
      <hr className="mt-0-5" />
      <Feed type="global" />
    </>
  );
}
