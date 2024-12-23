import { useOutletContext } from "react-router-dom";
import { useBoolean } from "usehooks-ts";
import { Edit, EditOff } from "@mui/icons-material";
import { toast } from "react-toastify";

import { User, type Community } from "../../types";
import { useGet } from "../../hooks/useGet";
import { MDWrapper } from "../MDWrapper";
import { LoadingSpacer } from "../LoadingSpacer";
import { CommunityWikiForm } from "../forms/CommunityWikiForm";
import { Alert } from "../Alert";

export function CommunityWiki() {
  const { community, user } = useOutletContext<{
    community: Community;
    user: User;
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
        <div className="flex-row jc-spb mb-1">
          <h2>Wiki</h2>
          {user &&
            (community.admin.id === user.id ||
              community.moderators.find((mod) => mod.id === user.id)) &&
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
        {editing ? (
          <CommunityWikiForm
            content={data.wiki}
            onSuccess={() => {
              toast(<p>Wiki changes successfully saved.</p>, {
                type: "success",
                className: "custom-toast",
              });
              cancelEditing();
              get(false);
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
  // return
}
