import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "../reusable/Form";
import { InputChecklist } from "../reusable/InputChecklist";

export function CommunityCreateForm() {
  const navigate = useNavigate();
  return (
    <Form
      destination={{ method: "POST", endpoint: "/communities" }}
      onSuccess={(formData) => {
        toast(<p>New community successfully created.</p>, {
          type: "success",
          className: "custom-toast",
        });
        navigate(`/community/${formData.urlName}`);
      }}
      buttonText="Create"
    >
      <label htmlFor="urlName">
        <span>URL Name</span>
        <small>Your community will be accessible in-url with this name.</small>
        <InputChecklist
          input={<input type="text" id="urlName" autoComplete="off" />}
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
          input={<input type="text" id="canonicalName" autoComplete="off" />}
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
        <textarea id="description" />
      </label>
    </Form>
  );
}
