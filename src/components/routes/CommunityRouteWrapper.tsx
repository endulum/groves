import { Outlet, useParams, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentTitle } from "usehooks-ts";

import { type User, type Community } from "../../types";
import { useCommunityMods } from "../../hooks/useCommunityMods";
import { useGet } from "../../hooks/useGet";
import { CommunityInfo } from "../unique/community/CommunityInfo";
import { CommunityStats } from "../unique/community/CommunityStats";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { NavTabs } from "../reusable/NavTabs";

export function CommunityRouteWrapper() {
  const { community } = useParams();
  const { user } = useOutletContext<{ user: User }>();
  const { loading, error, data, get } = useGet<Community>(
    `/community/${community}`
  );

  const { moderators, promoteMod, demoteMod } = useCommunityMods(data);

  useDocumentTitle(
    `${
      data?.canonicalName
        ? `${data.canonicalName} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing community..."
    }`
  );

  useEffect(() => {
    get();
  }, [community]);

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
        <CommunityInfo data={data} get={get} />
        <CommunityStats data={data} />
        <NavTabs
          tabs={[
            { to: `/community/${community}`, title: "Posts" },
            { to: `/community/${community}/wiki`, title: "Wiki" },
            { to: `/community/${community}/activity`, title: "Activity" },
            { to: `/community/${community}/moderation`, title: "Moderation" },
          ]}
        />
        <Outlet
          context={{
            user,
            community: data,
            moderators,
            promoteMod,
            demoteMod,
          }}
        />
      </>
    );
}
