import { QuestionMark } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export function ErrorRoute() {
  const { pathname } = useLocation();
  return (
    <div className="spacer">
      <QuestionMark />
      <p>Nothing was found at {pathname}</p>
      <p>
        <Link to="/">Go home?</Link>
      </p>
    </div>
  );
}
