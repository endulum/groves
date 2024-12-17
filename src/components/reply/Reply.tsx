import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateTime, DateTimeFormatOptions } from "luxon";
import { ExpandLess } from "@mui/icons-material";

import {
  type Reply,
  type VisibleReply,
  type HiddenReply,
  type ReplyStatus,
} from "../../types";
import { useGet } from "../../hooks/useGet";
import { VoteWidget } from ".././VoteWidget";
import { MDWrapper } from ".././MDWrapper";
import { ReplyForm } from "./ReplyForm";
import { CollapsedReply } from "./CollapsedReply";
import { ReplyActionRow } from "./ReplyActionRow";
import { Alert } from "../Alert";
import { gatherChildrenIds } from "../../functions/gatherChildrenIds";

const format: DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

export function Reply({
  data,
  status,
}: {
  data: VisibleReply | HiddenReply;
  status: ReplyStatus;
}) {
  const [loadMoreChildren, setLoadMoreChildren] = useState<string | null>(
    data.loadMoreChildren ?? null
  );
  const [loadChildren, setLoadChildren] = useState<string | null>(
    data.loadChildren ?? null
  );
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  // will hold a loadChildren or loadMoreChildren url

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [replying, setReplying] = useState<boolean>(false);

  const [children, setChildren] = useState<Reply[]>(data.children ?? []);

  // closest we can do to updating hidden as a state, if we want to hide things on the fly
  const [hidden, setHidden] = useState<boolean>(data.hidden);
  /*
  cases:
  - reply was not hidden, it has been toggled hidden { data.hidden = false, hidden = true }
  - reply was hidden, it has been toggled unhidden { data.hidden = true, hidden = false }
  */

  const {
    loading,
    data: moreData,
    get,
  } = useGet<{
    loadChildren: string | null;
    loadMoreChildren: string | null;
    children: Reply[];
  }>(nextUrl as string);

  // will fetch more children when nextUrl is set
  useEffect(() => {
    if (nextUrl) get(false);
  }, [nextUrl]);

  useEffect(() => {
    // will add moreData's children to current children when fetch is done
    if (moreData && nextUrl) {
      setChildren([...children, ...moreData.children]);
      setLoadChildren(moreData.loadChildren);
      setLoadMoreChildren(moreData.loadMoreChildren);
      setNextUrl(null);
    }
  }, [moreData]);

  // if a new reply is written, the client should see it immediately, hence
  const addNewChild = (newChild: Reply) => {
    setChildren([newChild, ...children]);
  };

  return (
    <div
      className={`reply${status.isShaded ? " shaded" : ""}${
        status.isTopLevel ? " first-level" : ""
      }`}
      id={data.id}
    >
      {collapsed ? (
        <CollapsedReply
          data={data}
          hidden={hidden}
          setCollapsed={setCollapsed}
          childCount={gatherChildrenIds(children).length}
        />
      ) : (
        <>
          {/* button */}
          <button
            className="button reply-collapse expanded"
            title="Hide reply tree"
            onClick={() => {
              setCollapsed(true);
            }}
          >
            <ExpandLess />
          </button>

          {/* content */}
          <div className="reply-content flex-row gap-1 align-start">
            {hidden || (!hidden && data.hidden) ? (
              <div className="reply-body flex-col align-start">
                {hidden && (
                  <Alert type="blind">
                    <p>This reply's content is hidden.</p>
                  </Alert>
                )}
                {!hidden && data.hidden && (
                  <Alert type="info">
                    <p>
                      This reply was unhidden. Its content will be visible on
                      the next render.
                    </p>
                  </Alert>
                )}
                {import.meta.env.MODE === "development" &&
                  import.meta.env.HIDE_TEXT === "true" && (
                    <pre className="mt-1">{data.id}</pre>
                  )}
                <ReplyActionRow
                  data={data}
                  status={status}
                  hidden={hidden}
                  setHidden={setHidden}
                  replying={replying}
                  setReplying={setReplying}
                />
              </div>
            ) : (
              !data.hidden && (
                <>
                  <VoteWidget data={data} />
                  <div className="reply-body flex-col align-start">
                    {/* author line */}
                    <small>
                      <Link to={`/user/${data.author.username}`}>
                        {data.author.username}
                      </Link>{" "}
                      replied{" "}
                      <span
                        title={DateTime.fromISO(data.datePosted).toLocaleString(
                          format
                        )}
                      >
                        {DateTime.fromISO(data.datePosted).toRelative()}
                      </span>
                    </small>

                    {import.meta.env.MODE === "development" &&
                    import.meta.env.HIDE_TEXT === "true" ? (
                      <pre className="mt-1">{data.id}</pre>
                    ) : (
                      <MDWrapper content={data.content} />
                    )}

                    <ReplyActionRow
                      data={data}
                      status={status}
                      hidden={hidden}
                      setHidden={setHidden}
                      replying={replying}
                      setReplying={setReplying}
                    />

                    {replying && (
                      <>
                        <hr className="mb-1 mt-1" />
                        <ReplyForm
                          postId={data.postId}
                          parentId={data.id}
                          onSuccess={(_submissionData, submissionResult) => {
                            setReplying(false);
                            addNewChild(submissionResult as Reply);
                          }}
                        />
                      </>
                    )}
                    {/* "load children" link for revealing children */}
                    {loadChildren && (
                      <small>
                        {loading ? (
                          <span>Loading replies...</span>
                        ) : (
                          <a
                            className="reply-loadmore mt-0-5 mb-0-5"
                            onClick={() => {
                              setNextUrl(loadChildren);
                            }}
                            title={loadChildren}
                          >
                            Load replies
                          </a>
                        )}
                      </small>
                    )}
                  </div>
                </>
              )
            )}
            {/* {hidden ? (
              <>
               
                
              </>
            ) : (
              <>
                
                <ReplyActionRow
                  data={data}
                  status={status}
                  hidden={hidden}
                  setHidden={setHidden}
                  replying={replying}
                  setReplying={setReplying}
                />
              </>
            )} */}
            {/* {hidden && data.hidden && <p>will be hidden</p>}
            {hidden && !data.hidden && <p>will be hidden</p>}
            {!hidden && data.hidden && <p>info about not being hidden</p>}
            {!hidden && !data.hidden && <p>will be present</p>} */}
            {/* {
              hidden
                ? (<>
                <Alert type="warning">
                  <p>This reply's content is hidden.</p>
                </Alert>
                <
                </>) // data is hidden
                : data.hidden 
                  ? (<p>owo</p>) // info message that it was unhidden
                  : (<p>owo</p>) // data is visible
            } */}
          </div>
          {children.length > 0 && (
            <>
              <div className="reply-children flex-col align-start gap-0-5 mt-1">
                {children.map((child) => (
                  <Reply
                    data={child as VisibleReply | HiddenReply}
                    status={{
                      ...status,
                      isShaded: !status.isShaded,
                      isTopLevel: false,
                    }}
                    key={child.id}
                  />
                ))}
              </div>
              {/* "load more children" link for child overflow */}
              {loadMoreChildren && (
                <small>
                  {loading ? (
                    <span>Loading more replies...</span>
                  ) : (
                    <a
                      className="reply-loadmore mt-1 mb-0-5"
                      onClick={() => {
                        setNextUrl(loadMoreChildren);
                      }}
                      title={loadMoreChildren}
                    >
                      Load more replies
                    </a>
                  )}
                </small>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
