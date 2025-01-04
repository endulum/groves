import { useOutletContext } from "react-router-dom";

import { type Community, type User } from "../../../types";
import { Username } from "../../reusable/Username";
import { PromoteModeratorForm } from "../../forms/PromoteModeratorForm";
import { DemoteModeratorButton } from "../../forms/buttons/DemoteModeratorButton";

export function CommunityModeratorList() {
  const { user, community, moderators, promoteMod, demoteMod } =
    useOutletContext<{
      user: User | null;
      community: Community;
      moderators: User[];
      promoteMod: (user: User) => void;
      demoteMod: (user: User) => void;
    }>();

  return (
    <>
      {/* list */}
      <h3 className="mb-1">Current moderators</h3>
      <ul className="flex-col align-start">
        {moderators.length > 0 ? (
          moderators.map((mod) => (
            <li className="flex-row gap-0-5" key={mod.id}>
              <Username user={mod} role="mod" />
              {!community.readonly &&
                user &&
                user.id === community.admin.id && (
                  <DemoteModeratorButton
                    username={mod.username}
                    communityUrl={community.urlName}
                    demoteMod={demoteMod}
                  />
                )}
            </li>
          ))
        ) : (
          <p>There are currently no moderators of this community.</p>
        )}
      </ul>

      {/* form to add more */}
      {!community.readonly && user && user.id === community.admin.id && (
        <>
          <h3 className="mt-1 mb-1">Promote a moderator</h3>
          <PromoteModeratorForm community={community} promoteMod={promoteMod} />
        </>
      )}
    </>
  );
}
