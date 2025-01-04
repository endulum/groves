import { useBoolean } from "usehooks-ts";

import { type Post, type PostComponentContext } from "../../../types";
import { PostContent } from "./PostContent";
import { ReplyView } from "../reply/ReplyView";

export function PostView({
  data,
  context,
}: {
  data: Post;
  context: PostComponentContext;
}) {
  const { value: readonly, setValue: setReadonly } = useBoolean(data.readonly);

  return (
    <>
      <PostContent
        data={data}
        context={context}
        readonly={readonly}
        setReadonly={setReadonly}
      />
      <ReplyView
        data={data}
        postContext={{
          ...context,
          isPostReadonly: readonly,
        }}
      />
    </>
  );
}
