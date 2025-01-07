import { QuestionMark } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

export function CommunityErrorRoute() {
  const navigate = useNavigate();
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
