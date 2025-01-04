import { useOutletContext } from "react-router-dom";

import { type User, type Community } from "../../../types";
import { Username } from "../../reusable/Username";
import { ChangeAdminForm } from "../../forms/ChangeAdminForm";

export function CommunityAdmin() {
  const { user, community, get } = useOutletContext<{
    user: User | null;
    community: Community;
    get: () => Promise<void>;
  }>();

  return (
    <>
      {/* list */}
      <h3 className="mb-1">Current admin</h3>
      <Username user={community.admin} role="admin" />

      {/* form to change admin */}
      {!community.readonly && user && user.id === community.admin.id && (
        <>
          <h3 className="mt-1 mb-1">Change admin</h3>
          <ChangeAdminForm community={community} get={get} />
        </>
      )}
    </>
  );
}
