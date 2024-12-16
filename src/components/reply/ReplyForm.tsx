import { Reply } from "../../types";
import { Form } from "../Form";

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

      <label htmlFor="parent" style={{ display: "none" }} aria-hidden>
        <span>Parent</span>
        <input id="parent" autoComplete="off" value={parentId ?? undefined} />
      </label>
      {/* i could use an input type="hidden" here but devtools issues makes a fuss */}
    </Form>
  );
}
