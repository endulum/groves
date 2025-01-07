import { useParams, useOutletContext, useLocation } from "react-router-dom";
import { useBoolean, useDocumentTitle } from "usehooks-ts";

import { type PostWithMeta, type User } from "../../types";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { useContext, useEffect } from "react";
// import { PostView } from "../unique/post/PostView";

import { PostContext, PostContextProvider } from "../unique/post/PostContext";
import { useLogger } from "../../hooks/useLogger";
import { PostContent } from "../unique/post/PostContent";
import { ReplyView } from "../unique/reply/ReplyView";

export function PostRoute() {
  const { post, reply } = useParams();
  const { user } = useOutletContext<{ user: User }>();
  const { loading, error, data, get } = useGet<PostWithMeta>(
    `/post/${post}?includeCommMeta=true&includePinnedReply=true`
  );

  /*
    (add comm info and pinned reply info with an optional query)
    
    stuff we wanna keep in post context as we render replies
    - who are the mods/admin of this community? (Username, action buttons)
    - who is the op of this post? (Username)
    - who is the authenticated user right now? (action buttons)
    - what is the isolated reply id right now? (render isolated view)
    - what is the pinned reply id right now? (action button, render pin)
    - is this post frozen right now? (action buttons)
    - is this post pinned right now? (not context, can just be in toplevel state)
  */

  /* const { user } = useOutletContext<{ user: User }>();
  const { value: readonly, setValue: setReadonly } = useBoolean(false);

  useEffect(() => {
    if (data && data.readonly === true) setReadonly(true);
  }, [data]); */

  // useEffect(() => {
  //   if (state && state.reload === true) get();
  // }, [state]);

  useDocumentTitle(
    `${
      data?.title
        ? `${data.title} :: ${import.meta.env.VITE_APP_NAME}`
        : "Viewing post..."
    }`
  );

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Getting post..."
      />
    );

  if (data)
    return (
      <>
        <PostContextProvider data={data} replyId={reply}>
          <PostContent />
          <ReplyView />
          {/* <ReplyView
        data={data}
        postContext={{
          ...context,
          isPostReadonly: readonly,
        }}
      /> */}
        </PostContextProvider>
        {/* <PostView
          data={data}
          context={{
            ...data.context,
            isPostReadonly: readonly,
            authUserID: user ? user.id : null,
            postAuthorID: data.author.id,
            isolateReplyID: null,
          }}
        /> */}
      </>
    );
}

// function Subcomponent() {
//   const { data, pinning } = useContext(PostContext);
//   const togglePin = () => {
//     if (pinning.pinned === true) pinning.unpin();
//     else pinning.pin();
//     console.log(pinning.pinned);
//   };
//   return (
//     <button className="button primary" onClick={togglePin}>
//       <span>{pinning.pinned.toString()}</span>
//     </button>
//   );
//   // const data = useContext();
//   // return <p>{value}</p>;
// }
