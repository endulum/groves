import { Reply } from "../types";
import { Form } from "./Form";

export function ReplyForm({
  postId,
  parentId,
  onSuccess,
}: {
  postId: string;
  parentId: string | null;
  onSuccess: (
    submissionData: Record<string, string>,
    submissionResult: unknown
  ) => void;
}) {
  return (
    <Form<Reply>
      destination={{ method: "POST", endpoint: `/post/${postId}/replies` }}
      onSuccess={onSuccess}
      buttonText="Reply"
    >
      <label htmlFor="content">
        <span>Write a reply:</span>
        <textarea id="content" />
      </label>

      <label htmlFor="parent">
        <span style={{ display: "none" }}></span>
        <input type="hidden" id="parent" value={parentId ?? undefined} />
      </label>
    </Form>
  );
}
