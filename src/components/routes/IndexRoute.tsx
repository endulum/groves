import { useDocumentTitle } from "usehooks-ts";

import { GlobalFeed } from "../feed/GlobalFeed";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>
      <GlobalFeed />
    </>
  );
}
