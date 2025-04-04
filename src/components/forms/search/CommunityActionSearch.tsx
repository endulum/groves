import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Forest, Park, Spa, Person } from "@mui/icons-material";

import { type Community, type User } from "../../../types";
import { Username } from "../../reusable/Username";
import { Search } from "../../reusable/Search";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { DateWithTitle } from "../../reusable/DateWithTitle";

type Action = {
  id: number;
  type: string;
  date: string;
  actor: { username: string; id: number };
};

type CommunityAction = Action & {
  type:
    | "Community_Create"
    | "Community_Edit"
    | "Community_EditWiki"
    | "Community_Freeze"
    | "Community_Unfreeze";
};

type UserAction = Action & {
  type: "User_PromoteMod" | "User_DemoteMod" | "User_ChangeAdmin";
  user: { username: string; id: number };
};

type PostAction = Action & {
  type:
    | "Post_Create"
    | "Post_Edit"
    | "Post_Freeze"
    | "Post_Unfreeze"
    | "Post_Pin"
    | "Post_Unpin";
  post: { id: string; title: string };
};

type ReplyAction = Action & {
  type: "Reply_Create" | "Reply_Hide" | "Reply_Unhide";
  reply: {
    id: string;
    post: { id: string; title: string };
  };
};

export function CommunityActionSearch({
  communityUrl,
}: {
  communityUrl: string;
}) {
  const { community, moderators } = useOutletContext<{
    community: Community;
    moderators: User[];
  }>();

  const getRole = (user: User) => {
    return moderators.find((mod) => mod.id === user.id) !== undefined
      ? "mod"
      : community.admin.id === user.id
      ? "admin"
      : null;
  };

  const renderActionIcon = (action: Action) => {
    if (action.type.startsWith("Community")) return <Forest />;
    if (action.type.startsWith("Post")) return <Park />;
    if (action.type.startsWith("Reply")) return <Spa />;
    if (action.type.startsWith("User")) return <Person />;
  };

  const renderAction = (
    action: CommunityAction | UserAction | PostAction | ReplyAction
  ) => {
    switch (action.type) {
      case "Community_Create":
        return "created this community.";
      case "Community_Edit":
        return "edited this community's details.";
      case "Community_EditWiki":
        return "edited this community's wiki.";
      case "Community_Freeze":
        return "froze this community.";
      case "Community_Unfreeze":
        return "unfroze this community.";
      case "User_PromoteMod":
        return (
          <span>
            promoted user{" "}
            <Username user={action.user} role={getRole(action.user)} /> to
            moderator.
          </span>
        );
      case "User_DemoteMod":
        return (
          <span>
            demoted user{" "}
            <Username user={action.user} role={getRole(action.user)} /> from
            moderator.
          </span>
        );
      case "User_ChangeAdmin":
        return (
          <span>
            promoted user{" "}
            <Username user={action.user} role={getRole(action.user)} /> to
            admin.
          </span>
        );
      case "Post_Create":
        return (
          <span>
            created a post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Post_Edit":
        return (
          <span>
            edited their post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Post_Freeze":
        return (
          <span>
            froze a post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Post_Unfreeze":
        return (
          <span>
            unfroze a post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Post_Pin":
        return (
          <span>
            pinned a post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Post_Unpin":
        return (
          <span>
            unpinned a post:{" "}
            <Link to={`/post/${action.post.id}`}>{action.post.title}</Link>
          </span>
        );
      case "Reply_Create":
        return (
          <span>
            created a reply under post:{" "}
            <Link to={`/post/${action.reply.post.id}/reply/${action.reply.id}`}>
              {action.reply.post.title}
            </Link>
          </span>
        );
      case "Reply_Hide":
        return (
          <span>
            hid a reply under post:{" "}
            <Link to={`/post/${action.reply.post.id}/reply/${action.reply.id}`}>
              {action.reply.post.title}
            </Link>
          </span>
        );
      case "Reply_Unhide":
        return (
          <span>
            unhid a reply under post:{" "}
            <Link to={`/post/${action.reply.post.id}/reply/${action.reply.id}`}>
              {action.reply.post.title}
            </Link>
          </span>
        );
      default:
        return <span> unknown action</span>;
    }
  };

  return (
    <Search<Action>
      startingParams={{ type: "" }}
      endpoint={`/community/${communityUrl}/actions`}
      formContent={
        <>
          <label htmlFor="type" className="search-label">
            Activity type
          </label>
          <select id="type">
            <option value="">All</option>
            <optgroup label="Activity Types">
              <option value="Community">Community</option>
              <option value="Post">Posts</option>
              <option value="Reply">Replies</option>
              <option value="User">Users</option>
            </optgroup>
            <optgroup label="Specific Activity">
              <option value="Community_Create">Community creation</option>
              <option value="Community_Edit">Community detail edit</option>
              <option value="Community_EditWiki">Community wiki edit</option>
              <option value="Community_Freeze">Community freeze</option>
              <option value="Community_Unfreeze">Community unfreeze</option>
              <option value="User_PromoteMod">Mod promotion</option>
              <option value="User_DemoteMod">Mod demotion</option>
              <option value="User_changeAdmin">Mod demotion</option>
              <option value="Post_Create">Post creation</option>
              <option value="Post_Edit">Post edit</option>
              <option value="Post_Freeze">Post freeze</option>
              <option value="Post_Unfreeze">Post unfreeze</option>
              <option value="Post_Pin">Post pin</option>
              <option value="Post_Unpin">Post unpin</option>
              <option value="Reply_Create">Reply creation</option>
              <option value="Reply_Hide">Reply hide</option>
              <option value="Reply_Unhide">Reply unhide</option>
            </optgroup>
          </select>
        </>
      }
      itemsPropertyName="actions"
      mapItems={(action: Action) => {
        return (
          <div
            className="search-result flex-row jc-spb align-start gap-1"
            key={action.id}
          >
            <div className="flex-row gap-0-5 align-start">
              {renderActionIcon(action)}
              <p>
                <Username
                  user={action.actor}
                  role={
                    moderators.find((mod) => mod.id === action.actor.id) !==
                    undefined
                      ? "mod"
                      : community.admin.id === action.actor.id
                      ? "admin"
                      : null
                  }
                />{" "}
                {renderAction(
                  action as
                    | CommunityAction
                    | UserAction
                    | PostAction
                    | ReplyAction
                )}
              </p>
            </div>
            <small className="mw-mxc">
              <DateWithTitle dateString={action.date} />
            </small>
          </div>
        );
      }}
      emptyElement={
        <NoResultsSpacer>
          <p>No activity to show.</p>
        </NoResultsSpacer>
      }
    />
  );
}
