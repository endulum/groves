import { useOutletContext } from "react-router-dom";

import { type Community, type User } from "../../../types";
import { FreezeCommunityButton } from "../../forms/buttons/FreezeCommunityButton";

export function CommunityStatus() {
  const { user, community, get } = useOutletContext<{
    user: User | null;
    community: Community;
    get: () => Promise<void>;
  }>();

  return (
    <>
      <h3 className="mb-1">Status</h3>
      {community.readonly ? (
        <p>
          This community is <b>frozen</b>. Content cannot be created, edited, or
          voted on, and moderation activity or management cannot occur.
        </p>
      ) : (
        <p>
          This community is <b>not frozen</b>. Content can be freely created,
          edited, and voted on.
        </p>
      )}

      {user && user.id === community.admin.id && (
        <>
          {community.readonly ? (
            <p className="mt-1 mb-1">
              Unfreezing this community will allow content to be freely created,
              edited, and voted on.
            </p>
          ) : (
            <p className="mt-1 mb-1">
              Freezing this community will no longer allow content to be freely
              created, edited, and voted on.
            </p>
          )}
          <FreezeCommunityButton community={community} get={get} />
        </>
      )}
    </>
  );
}
