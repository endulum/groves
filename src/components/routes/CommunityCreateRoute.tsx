import { useState } from "react";
import { Form } from "../Form";
import { Alert } from "../Alert";
import { InputChecklist } from "../InputChecklist";

export function CommunityCreateRoute() {
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <>
      <h2>Create a New Community</h2>
      <Form
        destination={{ method: "POST", endpoint: "/communities" }}
        onClickSubmit={() => {
          setSuccess(false);
        }}
        onSuccess={() => {
          setSuccess(true);
        }}
        buttonText="Create"
      >
        {success && (
          <Alert type="success">
            <p>
              Your community has been created. You have been given admin
              privileges over this community.
            </p>
          </Alert>
        )}
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
