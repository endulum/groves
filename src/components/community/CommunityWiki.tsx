import { useOutletContext } from "react-router-dom";

import { type Community } from "../../types";
import { useGet } from "../../hooks/useGet";
import { MDWrapper } from "../MDWrapper";
import { LoadingSpacer } from "../LoadingSpacer";

export function CommunityWiki() {
  const { community } = useOutletContext<{ community: Community }>();

  const { data, loading, error } = useGet<{ wiki: string }>(
    `/community/${community.urlName}/wiki`
  );

  if (loading || error)
    return (
      <div>
        <LoadingSpacer
          loading={true}
          error={error}
          customLoadingText="Getting wiki..."
        />
      </div>
    );
  if (data)
    return data.wiki ? (
      <MDWrapper content={data.wiki} />
    ) : (
      <i>No content was provided for this wiki just yet.</i>
    );
}
