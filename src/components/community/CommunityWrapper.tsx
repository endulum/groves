import { useParams, Outlet } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { type Community } from "../../types";
import { NavTabs } from "../NavTabs";

export function CommunityWrapper() {
  const { community } = useParams();
  const { loading, error, data } = useGet<Community>(`/community/${community}`);

  useDocumentTitle(
    `${
      data?.canonicalName
        ? `${data.canonicalName} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing community..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting community..."
      />
    );
  if (data)
    return (
      <>
        <h2>{data.canonicalName}</h2>
        <NavTabs
          tabs={[
            { to: `/community/${community}/`, title: "Posts" },
            { to: `/community/${community}/wiki`, title: "Wiki" },
          ]}
        />
        <Outlet context={{ community: data }} />
      </>
    );
}
