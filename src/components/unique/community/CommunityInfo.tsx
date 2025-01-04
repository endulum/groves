import { useBoolean } from "usehooks-ts";
import { Edit, EditOff } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";

import { type Community, type User } from "../../../types";
import { CommunityEditForm } from "../../forms/CommunityEditForm";
import { Alert } from "../../reusable/Alert";

export function CommunityInfo({
  data,
  get,
}: {
  data: Community;
  get: (keepCurrentData?: boolean) => Promise<void>;
}) {
  const { user } = useOutletContext<{ user: User }>();
  const {
    value: editing,
    setFalse: cancelEditing,
    setTrue: startEditing,
  } = useBoolean(false);

  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>{data.canonicalName}</h2>
        {user &&
          user.id === data.admin.id &&
          !data.readonly &&
          (editing ? (
            <button
              type="button"
              className="button plain warning"
              onClick={cancelEditing}
            >
              <EditOff />
              <span>Cancel editing</span>
            </button>
          ) : (
            <button
              type="button"
              className="button plain primary"
              onClick={startEditing}
            >
              <Edit />
              <span>Edit</span>
            </button>
          ))}
      </div>
      {editing ? (
        <CommunityEditForm data={data} get={get} />
      ) : (
        <p>{data.description}</p>
      )}
      {data.readonly && (
        <Alert type="info" className="mt-1">
          <p>
            This community is frozen. Content cannot be created, edited, or
            voted on.
          </p>
        </Alert>
      )}
    </>
  );
}
