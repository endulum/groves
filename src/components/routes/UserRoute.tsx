import { useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { DateTime } from "luxon";
import { useDocumentTitle } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { type User, type UserData } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { UserActivity } from "../user/UserActivity";

export function UserRoute() {
  const { user } = useParams();
  const { user: authUser } = useOutletContext<{ user: User }>();
  const { loading, error, data, get } = useGet<UserData>(`/user/${user}`);

  useEffect(() => {
    get(false);
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
        {/* <UserInfo data={data} get={get} /> */}
        <div className="flex-row jc-spb mb-1">
          <h2>{data.username}</h2>
          {authUser && authUser.id === data.id && (
            <Link to="/account" type="button" className="button primary">
              <AccountCircle />
              <span>Account</span>
            </Link>
          )}
        </div>
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
        <h3 className="mt-1">Latest content</h3>
        <UserActivity userId={data.id} />
      </>
    );
}
