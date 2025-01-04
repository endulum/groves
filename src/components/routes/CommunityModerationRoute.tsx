import { CommunityAdmin } from "../unique/community/CommunityAdmin";
import { CommunityModeratorList } from "../unique/community/CommunityModeratorList";
import { CommunityStatus } from "../unique/community/CommunityStatus";

export function CommunityModerationRoute() {
  return (
    <>
      <CommunityAdmin />
      <hr className="mt-1 mb-1" />
      <CommunityModeratorList />
      <hr className="mt-1 mb-1" />
      <CommunityStatus />
    </>
  );
}
