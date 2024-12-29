import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { useDocumentTitle } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { User } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { UserActivity } from "../user/UserActivity";
import { useEffect } from "react";

interface UserData extends User {
  joined: string;
  bio: string;
}

export function UserRoute() {
  const { user } = useParams();
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
        <h2>{data.username}</h2>
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
