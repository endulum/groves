import { Link, useParams, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { ManageAccounts } from "@mui/icons-material";
import { DateTime } from "luxon";

import { type User, type UserData } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { UserContent } from "../unique/user/UserContent";

export function UserRoute() {
  const { user } = useParams();
  const { user: authUser } = useOutletContext<{ user: User }>();
  const { loading, error, data, get } = useGet<UserData>(`/user/${user}`);

  useEffect(() => {
    get();
  }, [user]);

  useDocumentTitle(
    `${
      data?.username
        ? `${data.username} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing user..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting user info..."
      />
    );
  if (data)
    return (
      <>
        {/* heading */}
        <div className="flex-row jc-spb mb-1">
          <h2>{data.username}</h2>
          {authUser && authUser.id === data.id && (
            <Link to="/account" type="button" className="button primary">
              <ManageAccounts />
              <span>Account</span>
            </Link>
          )}
        </div>

        {/* profile detail */}
        <p>
          {data.bio && (
            <>
              {data.bio}
              <br />
            </>
          )}
          <small>
            Joined{" "}
            {DateTime.fromISO(data.joined).toLocaleString({
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        </p>

        {/* latest content */}
        <UserContent data={data} />
      </>
    );
}
