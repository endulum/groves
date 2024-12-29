import { useOutletContext } from "react-router-dom";

import { Community } from "../../types";
import { ActionSearch } from "../forms/ActionSearch";

export function CommunityActivity() {
  const { community } = useOutletContext<{ community: Community }>();

  return <ActionSearch communityUrl={community.urlName} />;
}
