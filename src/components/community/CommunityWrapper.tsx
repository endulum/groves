import { useEffect } from "react";
import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { type User, type Community } from "../../types";
import { NavTabs } from "../NavTabs";
import { CommunityInfo } from "./CommunityInfo";
import { CommunityStats } from "./CommunityStats";
import { useCommunityMods } from "../../hooks/useCommunityMods";

export function CommunityWrapper() {
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
    get(false);
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
        {/* <CommunityInfo data={data} get={get} /> */}
        <NavTabs
          tabs={[
            { to: `/community/${community}`, title: "Posts" },
            { to: `/community/${community}/wiki`, title: "Wiki" },
            { to: `/community/${community}/activity`, title: "Activity" },
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
