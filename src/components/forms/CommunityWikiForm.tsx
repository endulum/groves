import { useOutletContext } from "react-router-dom";

import { type Community } from "../../types";
import { Form } from "../reusable/Form";

export function CommunityWikiForm({
  content,
  onSuccess,
}: {
  content: string;
  onSuccess: () => void;
}) {
  const { community } = useOutletContext<{ community: Community }>();

  return (
    <Form
      destination={{
        endpoint: `/community/${community.urlName}/wiki`,
        method: "PUT",
      }}
      onSuccess={onSuccess}
      buttonText="Save Changes"
    >
      <hr />
      <label htmlFor="content">
        <span>Content</span>
        <small>Leave blank to erase. Limited markdown is available.</small>
        <textarea
          id="content"
          defaultValue={content}
          style={{ minHeight: "500px" }}
          maxLength={10000}
        />
      </label>
    </Form>
  );
}
