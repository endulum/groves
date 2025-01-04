import { useOutletContext } from "react-router-dom";

import { Community } from "../../types";
import { CommunityActionSearch } from "../forms/search/CommunityActionSearch";

export function CommunityActivityRoute() {
  const { community } = useOutletContext<{ community: Community }>();

  return <CommunityActionSearch communityUrl={community.urlName} />;
}
