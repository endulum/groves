import { ArrowForwardIos, PeopleAlt, Park } from "@mui/icons-material";

import { Link } from "react-router-dom";

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

export function CommunitiesRoute() {
  return (
    <>
      <h2>Explore Communities</h2>
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
            <div>
              <h3>{comm.canonicalName}</h3>
              <small>/{comm.urlName}</small>
              {comm.description && <p>{comm.description}</p>}
            </div>
            <div className="community-results-stats">
              <div
                className="stat"
                title={`${comm._count.followers} followers`}
              >
                <PeopleAlt />
                <small>{comm._count.followers}</small>
              </div>
              <div className="stat" title={`${comm._count.followers} posts`}>
                <Park />
                <small>{comm._count.posts}</small>
              </div>
              <Link
                type="button"
                className="button"
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
