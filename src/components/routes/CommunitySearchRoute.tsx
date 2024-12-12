import { AddCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { CommunitySearch } from "../forms/CommunitySearch";

export function CommunitySearchRoute() {
  return (
    <>
      <div className="flex-row jc-spb">
        <h2>Explore Communities</h2>
        <Link
          to="/communities/new"
          type="button"
          className="button plain-accent-2"
        >
          <AddCircle />
          <span>Create</span>
        </Link>
      </div>
      <CommunitySearch />
    </>
  );
}
