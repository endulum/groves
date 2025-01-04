import { QuestionMark } from "@mui/icons-material";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { type Community } from "../../types";

export function CommunityErrorRoute() {
  const navigate = useNavigate();
  const { community } = useOutletContext<{ community: Community }>();
  useDocumentTitle(
    `${community.canonicalName} :: Not Found :: ${
      import.meta.env.VITE_APP_NAME
    }`
  );
  const { pathname } = useLocation();
  return (
    <div>
      <div className="spacer">
        <QuestionMark />
        <p>Nothing was found at {pathname}</p>
        <button
          type="button"
          className="button plain secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <span>Go back</span>
        </button>
      </div>
    </div>
  );
}
