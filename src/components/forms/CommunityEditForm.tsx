import { useNavigate } from "react-router-dom";

import { Community } from "../../types";
import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";
import { toast } from "react-toastify";

export function CommunityEditForm({
  data,
  get,
}: {
  data: Community;
  get: (keepCurrentData?: boolean) => Promise<void>;
}) {
  const navigate = useNavigate();
  return (
    <Form
      destination={{ method: "PUT", endpoint: `/community/${data.urlName}` }}
      onSuccess={(submissionData) => {
        toast(<p>Community changes successfully saved.</p>, {
          type: "success",
          className: "custom-toast",
        });
        if (data.urlName !== submissionData.urlName) {
          navigate(`/community/${submissionData.urlName}`);
        } else {
          get();
        }
      }}
      buttonText="Save"
    >
      <label htmlFor="urlName">
        <span>URL Name</span>
        <small>Your community will be accessible in-url with this name.</small>
        <InputChecklist
          input={
            <input
              type="text"
              id="urlName"
              autoComplete="off"
              defaultValue={data.urlName}
              maxLength={32}
              required
            />
          }
          requirements={[
            {
              description: "Must be between 2 and 32 characters in length",
              function: (x: string) => x.length >= 2 && x.length <= 32,
            },
            {
              description: "Must contain only lowercase letters and numbers",
              function: (x: string) => x.match(/^[a-z0-9]+$/g) !== null,
            },
          ]}
        />
      </label>

      <label htmlFor="canonicalName">
        <span>Canonical Name</span>
        <small>
          Cosmetic name for your community, allowing capitalization and
          punctuation.
        </small>
        <InputChecklist
          input={
            <input
              type="text"
              id="canonicalName"
              autoComplete="off"
              defaultValue={data.canonicalName}
              maxLength={32}
              required
            />
          }
          requirements={[
            {
              description: "Must be between 2 and 64 characters in length",
              function: (x: string) => x.length >= 2 && x.length <= 32,
            },
          ]}
        />
      </label>

      <label htmlFor="description">
        <span>Description</span>
        <textarea
          id="description"
          defaultValue={data.description}
          maxLength={200}
          required
        />
      </label>
    </Form>
  );
}
