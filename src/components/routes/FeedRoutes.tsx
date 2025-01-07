import { useDocumentTitle } from "usehooks-ts";

import { Feed } from "../unique/feed/Feed";

export function PersonalFeedRoute() {
  useDocumentTitle(`Your Feed :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <p className="mt-1">
        <small>Latest content from communities you follow</small>
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
        <small>Hottest content from across Groves</small>
      </p>
      <Feed type="global" />
    </>
  );
}
