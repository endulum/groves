import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "../reusable/Form";

export function PostCreateForm({ communityUrl }: { communityUrl: string }) {
  const navigate = useNavigate();
  return (
    <Form<{ id: string }>
      destination={{
        endpoint: `/community/${communityUrl}/posts`,
        method: "POST",
      }}
      onSuccess={(_submissionData, submissionResult) => {
        toast(<p>New post successfully created.</p>, {
          type: "success",
          className: "custom-toast",
        });
        navigate(`/post/${submissionResult.id}`);
      }}
      buttonText="Post"
    >
      <label htmlFor="title">
        <span>Title</span>
        <input type="text" id="title" autoComplete="off" />
      </label>

      <label htmlFor="content">
        <span>Content</span>
        <small>Limited markdown is available.</small>
        <textarea id="content" />
      </label>
    </Form>
  );
}
