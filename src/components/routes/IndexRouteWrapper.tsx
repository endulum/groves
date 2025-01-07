import { Outlet, Link, useOutletContext } from "react-router-dom";
import { Explore, Forest } from "@mui/icons-material";

import { NavTabs } from "../reusable/NavTabs";
import { type User } from "../../types";

export function IndexRouteWrapper() {
  const { user } = useOutletContext<{ user: User }>();
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>
          <span style={{ fontWeight: "normal" }}>Welcome back,</span>{" "}
          {user.username}
        </h2>
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
