import { useNavigate, useOutletContext } from "react-router-dom";
import { useBoolean } from "usehooks-ts";
import { Edit, EditOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

import { type User, type UserData } from "../../types";
import { Form } from "../Form";
import { InputChecklist } from "../InputChecklist";

export function UserInfo({
  data,
  get,
}: {
  data: UserData;
  get: (keepCurrentData: boolean) => Promise<void>;
}) {
  const { user, changeUsername } = useOutletContext<{
    user: User;
    changeUsername: (username: string) => void;
  }>();
  const {
    value: editing,
    setFalse: cancelEditing,
    setTrue: startEditing,
  } = useBoolean(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-row jc-spb mb-1">
        <h2>{data.username}</h2>
        {user &&
          user.id === data.id &&
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
        <Form
          destination={{
            method: "PUT",
            endpoint: "/me",
          }}
          onSuccess={(submissionData) => {
            toast(<p>Profile changes successfully saved.</p>, {
              type: "success",
              className: "custom-toast",
            });
            if (data.username !== submissionData.username) {
              changeUsername(submissionData.username);
              navigate(`/user/${submissionData.username}`);
            } else {
              get(false);
            }
          }}
          buttonText="Save"
        >
          <label htmlFor="username">
            <span>Username</span>
            <InputChecklist
              input={
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  defaultValue={data.username}
                />
              }
              requirements={[
                {
                  description: "Must be between 2 and 32 characters in length",
                  function: (x: string) => x.length >= 2 && x.length <= 32,
                },
                {
                  description:
                    "Must contain only lowercase letters, numbers, and hyphens",
                  function: (x: string) => x.match(/^[a-z0-9-]+$/g) !== null,
                },
              ]}
            />
          </label>

          <label htmlFor="bio">
            <span>Bio</span>
            <textarea id="bio" defaultValue={data.bio} />
          </label>
        </Form>
      ) : (
        <p>
          {data.bio && (
            <>
              {data.bio}
              <br />
            </>
          )}
          <small>
            Joined{" "}
            {DateTime.fromISO(data.joined).toLocaleString({
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </small>
        </p>
      )}
    </>
  );
}
