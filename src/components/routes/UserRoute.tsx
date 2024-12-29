import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDocumentTitle } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { type UserData } from "../../types";
import { LoadingSpacer } from "../LoadingSpacer";
import { UserActivity } from "../user/UserActivity";
import { UserInfo } from "../user/UserInfo";

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
        <UserInfo data={data} get={get} />
        <h3 className="mt-1">Latest content</h3>
        <UserActivity userId={data.id} />
      </>
    );
}
