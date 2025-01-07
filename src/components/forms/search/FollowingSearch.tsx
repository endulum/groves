import { Link } from "react-router-dom";
import { ArrowForwardIos, Forest } from "@mui/icons-material";
import { DateTime } from "luxon";

import { Search } from "../../reusable/Search";
import { NoResultsSpacer } from "../../reusable/NoResultsSpacer";
import { FollowButton } from "../buttons/FollowButton";

type CommunityResult = {
  id: number;
  urlName: string;
  canonicalName: string;
  lastActivity: string;
};

export function FollowingSearch() {
  return (
    <>
      <Search
        startingParams={{ name: "" }}
        endpoint="/following"
        formContent={
          <>
            <label htmlFor="name" className="search-label">
              Name
            </label>
            <input type="text" id="name" />
          </>
        }
        itemsPropertyName="communities"
        mapItems={(comm: CommunityResult) => (
          <div className="search-result" key={comm.id}>
            <div className="flex-row jc-spb gap-1">
              <div className="flex-col gap-0-25 align-start">
                <div className="flex-row gap-0-75 align-start">
                  <Forest style={{ width: "1.5rem", height: "1.5rem" }} />
                  <div>
                    <h3>
                      {comm.canonicalName}{" "}
                      <small
                        style={{ fontWeight: "normal", fontSize: "0.875rem" }}
                      >
                        /{comm.urlName}
                      </small>
                    </h3>
                    <small className="community-lastactivity">
                      Last activity{" "}
                      {DateTime.fromISO(comm.lastActivity).toRelative()}
                    </small>
                  </div>
                </div>
              </div>
              <div className="flex-row gap-0-5">
                <FollowButton
                  data={{
                    ...comm,
                    meta: { isFollowing: true },
                  }}
                />
                <Link
                  type="button"
                  className="button plain secondary"
                  to={`/community/${comm.urlName}`}
                  title="View community"
                >
                  <ArrowForwardIos />
                </Link>
              </div>
            </div>
          </div>
        )}
        emptyElement={<NoResultsSpacer />}
      />
    </>
  );
}
