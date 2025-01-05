import { Outlet, Link } from "react-router-dom";
import { Explore } from "@mui/icons-material";

import { NavTabs } from "../reusable/NavTabs";

export function IndexRouteWrapper() {
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>Home</h2>
        <Link to="/explore" type="button" className="button primary">
          <Explore />
          <span>Explore</span>
        </Link>
      </div>
      <NavTabs
        tabs={[
          { to: `/feed`, title: "Your Feed" },
          { to: `/all`, title: "Global Feed" },
        ]}
      />
      <Outlet />
    </>
  );
}
