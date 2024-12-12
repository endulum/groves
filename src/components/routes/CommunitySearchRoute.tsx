import {
  ArrowForwardIos,
  PeopleAlt,
  Park,
  AddCircle,
  Forest,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

import { Search } from "../Search";

type CommunityResult = {
  id: number;
  urlName: string;
  canonicalName: string;
  description: string;
  lastActivity: string;
  _count: {
    followers: number;
    posts: number;
  };
};

export function CommunitySearchRoute() {
  return (
    <>
      <div className="flex-row jc-spb">
        <h2>Explore Communities</h2>
        <Link
          to="/communities/new"
          type="button"
          className="button plain-accent-2"
        >
          <AddCircle />
          <span>Create</span>
        </Link>
      </div>
      <Search<CommunityResult>
        startingParams={{
          sort: "activity",
          take: "8",
        }}
        endpoint="/communities"
        formContent={
          <>
            <label htmlFor="name" className="search-label">
              Name
            </label>
            <input type="text" id="name" />

            <label htmlFor="sort" className="search-label">
              Sort by
            </label>
            <select id="sort">
              <option value="activity">Latest activity</option>
              <option value="posts">Posts</option>
              <option value="followers">Followers</option>
            </select>
          </>
        }
        resultsPropertyName="communities"
        mapResults={(comm: CommunityResult) => (
          <div className="search-result community" key={comm.id}>
            <div className="flex-col gap-0-25 align-start">
              <div className="flex-row gap-0-75 align-start">
                <Forest style={{ width: "2rem", height: "2rem" }} />
                <div>
                  <h3>{comm.canonicalName}</h3>
                  <small>/{comm.urlName}</small>
                </div>
              </div>
              {comm.description && <p>{comm.description}</p>}
            </div>
            <div className="flex-row gap-1">
              <div className="flex-col gap-0-25 align-end">
                <div className="flex-row gap-0-5">
                  <div
                    className="flex-col"
                    title={`${comm._count.followers} followers`}
                  >
                    <PeopleAlt />
                    <small>{comm._count.followers}</small>
                  </div>
                  <div
                    className="flex-col"
                    title={`${comm._count.followers} posts`}
                  >
                    <Park />
                    <small>{comm._count.posts}</small>
                  </div>
                </div>
                <small className="community-lastactivity">
                  Last activity{" "}
                  {DateTime.fromISO(comm.lastActivity).toRelative()}
                </small>
              </div>
              <Link
                type="button"
                className="button plain-accent-2"
                to={`/community/${comm.urlName}`}
                title="View community"
              >
                <ArrowForwardIos />
              </Link>
            </div>
          </div>
        )}
      />
    </>
  );
}
