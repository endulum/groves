import { useBoolean } from "usehooks-ts";
import { Edit, EditOff } from "@mui/icons-material";

import { Community } from "../../types";
import { CommunityEditForm } from "../forms/CommunityEditForm";

export function CommunityInfo({
  data,
  get,
}: {
  data: Community;
  get: (keepCurrentData: boolean) => Promise<void>;
}) {
  const {
    value: editing,
    setFalse: cancelEditing,
    setTrue: startEditing,
  } = useBoolean(false);

  return (
    <>
      <div className="flex-row jc-spb align-start">
        <div>
          {editing ? (
            <CommunityEditForm data={data} get={get} />
          ) : (
            <p>{data.description}</p>
          )}
        </div>
        {editing ? (
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
        )}
      </div>
    </>
  );
}
