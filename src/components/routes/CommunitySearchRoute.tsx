import { Forest } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { CommunitySearch } from "../forms/CommunitySearch";

export function CommunitySearchRoute() {
  useDocumentTitle(`Explore Communities :: ${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Explore Communities</h2>
        <Link to="/communities/new" type="button" className="button primary">
          <Forest />
          <span>Create</span>
        </Link>
      </div>
      <CommunitySearch />
    </>
  );
}
