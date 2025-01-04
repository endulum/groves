import { EditOff, Edit } from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useBoolean } from "usehooks-ts";

import { type Community, type User } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { MDWrapper } from "../reusable/MDWrapper";
import { Alert } from "../reusable/Alert";
import { CommunityWikiForm } from "../forms/CommunityWikiForm";

export function CommunityWikiRoute() {
  const { community, user, moderators } = useOutletContext<{
    community: Community;
    user: User;
    moderators: User[];
  }>();

  const {
    value: editing,
    setFalse: cancelEditing,
    setTrue: startEditing,
  } = useBoolean(false);

  const { data, loading, error, get } = useGet<{ wiki: string }>(
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
    return (
      <>
        {/* heading */}
        <div className="flex-row jc-spb mb-1">
          <h2>Wiki</h2>
          {!community.readonly &&
            user &&
            (community.admin.id === user.id ||
              moderators.find((mod) => mod.id === user.id)) &&
            (editing ? (
              <button
                type="button"
                className="button plain warning"
                onClick={cancelEditing}
              >
                <EditOff />
                <span>Cancel Editing</span>
              </button>
            ) : (
              <button
                type="button"
                className="button primary"
                onClick={startEditing}
              >
                <Edit />
                <span>Edit</span>
              </button>
            ))}
        </div>

        {/* content or editing thereof */}
        {editing ? (
          <CommunityWikiForm
            content={data.wiki}
            onSuccess={() => {
              toast(<p>Wiki changes successfully saved.</p>, {
                type: "success",
                className: "custom-toast",
              });
              cancelEditing();
              get();
            }}
          />
        ) : data.wiki ? (
          <MDWrapper content={data.wiki} />
        ) : (
          <Alert type="blind">
            <p>No content was provided for this community's wiki.</p>
          </Alert>
        )}
      </>
    );
}
