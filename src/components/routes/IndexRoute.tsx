import { useDocumentTitle } from "usehooks-ts";

import { FlyoutMenu } from "../FlyoutMenu";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>

      <FlyoutMenu x="left" y="bottom">
        <button className="button plain">
          <small>link one</small>
        </button>
        <button className="button plain">
          <small>link two</small>
        </button>
        <button className="button plain">
          <small>link three</small>
        </button>
      </FlyoutMenu>
    </>
  );
}
