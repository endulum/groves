import { useNavigate } from "react-router-dom";
import { Form } from "../Form";
import { InputChecklist } from "../InputChecklist";
import { useLoginRedirect } from "../../hooks/useLoginRedirect";

export function CommunityCreateRoute() {
  useLoginRedirect();
  const navigate = useNavigate();
  return (
    <>
      <h2>Create a New Community</h2>
      <Form
        destination={{ method: "POST", endpoint: "/communities" }}
        onSuccess={(formData) => {
          navigate(`/community/${formData.urlName}`);
        }}
        buttonText="Create"
      >
        <label htmlFor="urlName">
          <span>URL Name</span>
          <small>
            Your community will be accessible in-url with this name.
          </small>
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
    </>
  );
}
