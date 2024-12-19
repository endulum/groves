import { QuestionMark } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

export function ErrorRoute() {
  useDocumentTitle(`Not Found :: ${import.meta.env.VITE_APP_NAME}`);
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
