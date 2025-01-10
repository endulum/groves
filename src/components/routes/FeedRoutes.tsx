import { useDocumentTitle } from "usehooks-ts";

import { Feed } from "../unique/feed/Feed";
import { Link } from "react-router-dom";

export function PersonalFeedRoute() {
  useDocumentTitle(`Your Feed :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <p className="mt-1">
        <small>
          Latest content from{" "}
          <Link to="/following">communities you follow</Link>
        </small>
      </p>
      <Feed type="following" />
    </>
  );
}

export function GlobalFeedRoute() {
  useDocumentTitle(`Global Feed :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <p className="mt-1">
        <small>
          Hottest content from across {import.meta.env.VITE_APP_NAME}
        </small>
      </p>
      <Feed type="global" />
    </>
  );
}
