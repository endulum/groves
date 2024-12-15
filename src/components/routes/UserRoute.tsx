import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { User } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";

interface UserData extends User {
  joined: string;
}

export function UserRoute() {
  const { user } = useParams();
  const { loading, error, data } = useGet<UserData>(`/user/${user}`);

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
          Joined{" "}
          {DateTime.fromISO(data.joined).toLocaleString({
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </>
    );
}
