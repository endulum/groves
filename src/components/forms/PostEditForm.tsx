import { toast } from "react-toastify";

import { Form } from "../Form";
import { Post } from "../../types";

export function PostEditForm({
  data,
  setPostContent,
  cancelEditing,
}: {
  data: Post;
  setPostContent: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      lastEdited: string | null;
    }>
  >;
  cancelEditing: () => void;
}) {
  return (
    <Form<{ id: string }>
      destination={{
        endpoint: `/post/${data.id}`,
        method: "PUT",
      }}
      onSuccess={(submissionData) => {
        toast(<p>Post changes successfully saved.</p>, {
          type: "success",
          className: "custom-toast",
        });
        setPostContent({
          title: submissionData.title,
          content: submissionData.content,
          lastEdited: new Date().toISOString(),
        });
        cancelEditing();
      }}
      buttonText="Save"
    >
      <label htmlFor="title">
        <span>Title</span>
        <input
          type="text"
          id="title"
          autoComplete="off"
          defaultValue={data.title}
        />
      </label>

      <label htmlFor="content">
        <span>Content</span>
        <small>Limited markdown is available.</small>
        <textarea id="content" defaultValue={data.content} />
      </label>
    </Form>
  );
}
