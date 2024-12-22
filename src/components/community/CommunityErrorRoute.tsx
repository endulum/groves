import { QuestionMark } from "@mui/icons-material";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { type Community } from "../../types";

export function CommunityErrorRoute() {
  const { community } = useOutletContext<{ community: Community }>();
  useDocumentTitle(
    `${community.canonicalName} :: Not Found :: ${
      import.meta.env.VITE_APP_NAME
    }`
  );
  const { pathname } = useLocation();
  return (
    <div className="spacer">
      <QuestionMark />
      <p>Nothing was found at {pathname}</p>
      <p>
        <Link to={`/community/${community.urlName}/`}>Go home?</Link>
      </p>
    </div>
  );
}
