import { useState, useRef, useEffect } from "react";
import {
  FirstPage,
  LastPage,
  ArrowForwardIos,
  PeopleAlt,
  Park,
} from "@mui/icons-material";

import { Expander } from "../Expander";
import { useLogger } from "../../hooks/useLogger";
import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../LoadingSpacer";
import { Link } from "react-router-dom";

export function CommunitiesRoute() {
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const params = useRef<Record<string, string>>({
    sort: "activity",
    take: "8",
  });
  const [url, setUrl] = useState<string>("/communities?take=8");

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!params.current) return;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      params.current = {
        ...params.current,
        [e.target.id]: e.target.value,
      };
      const trimmedParams = Object.fromEntries(
        Object.entries(params.current).filter(([_key, value]) => value !== "")
      );
      setUrl(`/communities?${new URLSearchParams(trimmedParams).toString()}`);
    }, 750);
  };

  const { loading, error, data, get } = useGet<{
    links: { nextPage: string | null; prevPage: string | null };
    communities: Array<{
      id: number;
      urlName: string;
      canonicalName: string;
      description: string;
      lastActivity: string;
      _count: {
        followers: number;
        posts: number;
      };
    }>;
  }>(url);

  useEffect(() => {
    get(false);
  }, [url]);

  useLogger({ url, loading, error, data });

  return (
    <>
      <h2>Explore Communities</h2>
      <Expander title="Search">
        <form
          className="search"
          onChange={handleChange}
          onSubmit={(e) => e.preventDefault()}
        >
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
        </form>
      </Expander>
      <hr />

      <div className="search-results">
        {data ? (
          <>
            {data.communities.map((comm) => (
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
                  <div
                    className="stat"
                    title={`${comm._count.followers} posts`}
                  >
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
            ))}
          </>
        ) : (
          <LoadingSpacer loading={true} error={error} />
        )}
      </div>

      <div className="search-page-buttons">
        <button
          className="button"
          disabled={data == null || data?.links.prevPage === null}
          onClick={() => {
            if (data?.links.prevPage) setUrl(data.links.prevPage);
          }}
          aria-label="Previous results"
        >
          <FirstPage />
        </button>
        <button
          className="button"
          disabled={data == null || data?.links.nextPage === null}
          onClick={() => {
            if (data?.links.nextPage) setUrl(data.links.nextPage);
          }}
          aria-label="More results"
        >
          <LastPage />
        </button>
      </div>

      {/* {(loading || error) && <LoadingSpacer loading={loading} error={error} />} */}

      {/* {data ? (
        <>
          <div className="search-results"></div>
          
        </>
      ) : (
        <LoadingSpacer loading={loading} error={error} />
      )} */}
    </>
  );
}
