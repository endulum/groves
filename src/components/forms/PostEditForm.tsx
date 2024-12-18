import { Form } from "../Form";
import { Post } from "../../types";

export function PostEditForm({
  data,
  setPostContent,
  setEditing,
}: {
  data: Post;
  setPostContent: React.Dispatch<
    React.SetStateAction<{
      title: string;
      content: string;
      lastEdited: string | null;
    } | null>
  >;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Form<{ id: string }>
      destination={{
        endpoint: `/post/${data.id}`,
        method: "PUT",
      }}
      onSuccess={(submissionData) => {
        setPostContent({
          title: submissionData.title,
          content: submissionData.content,
          lastEdited: new Date().toISOString(),
        });
        setEditing(false);
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
