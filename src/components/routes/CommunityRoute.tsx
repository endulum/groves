import { useEffect, useRef, useState } from 'react';
import useGetRequest from '../../hooks/useGetRequest';
import useLogger from '../../hooks/useLogger';
import { type Community } from '../../types';
import HeadingWrapper from '../reusable/HeadingWrapper';
import LoadingWrapper from '../reusable/LoadingWrapper';

export default function CommunityRoute() {
  const timerRef: { current: ReturnType<typeof setInterval> | null } = useRef(null);

  const [params, setParams] = useState<Record<string, string | number>>({});
  function formatQuery() {
    let queryString = '/communities';
    if (Object.keys(params).length > 0) {
      queryString += '?';
      Object.keys(params).forEach((param, index) => {
        queryString += `${param}=${params[param]}`;
        if (index !== Object.keys(params).length - 1) {
          queryString += '&';
        }
      });
    }
    return queryString;
  }

  const {
    loading, error, data, get,
  } = useGetRequest<{
    page: number,
    pages: number,
    communities: Array<Community>
  }>(formatQuery());

  function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setParams({
        ...params,
        page: 1,
        [e.target.id]: e.target.value,
      });
    }, 750);
  }

  useLogger(params);

  useEffect(() => {
    get(false);
  }, [params]);

  return (
    <HeadingWrapper title="Explore Communities">
      <form
        className="search-form flex-row"
        onSubmit={(e) => e.preventDefault()}
        onChange={handleChange}
      >
        <label htmlFor="name" className="flex-col">
          <span>Name</span>
          <input type="text" id="name" />
        </label>

        <label htmlFor="sort" className="flex-col">
          <span>Sort by</span>
          <select id="sort">
            <option value="activity">Latest activity</option>
            <option value="posts">Posts</option>
            <option value="followers">Followers</option>
          </select>
        </label>
      </form>

      <div className="flex-col" style={{ gap: '0.5rem' }}>
        {(loading || error !== null) && (
          <LoadingWrapper loading={loading} error={error} />
        )}
        {data !== null && (
          <>
            <div className="pagination flex-row">
              <p>
                Viewing page
                {' '}
                {data.page}
                {' '}
                of
                {' '}
                {data.pages}
              </p>

              <label htmlFor="page">
                <span>Page: </span>
                <select
                  id="page"
                  onChange={(e) => {
                    setParams({ ...params, page: e.target.value });
                  }}
                  defaultValue={params.page}
                >
                  {[...Array(data.pages)].map((page, index) => (
                    <option key={page} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </label>
            </div>

            <ul className="communities flex-col">
              {data.communities.map((community: Community) => (
                <li key={community.id} className="community">
                  <h3>{community.canonicalName}</h3>
                  <small>
                    /
                    {community.urlName}
                  </small>
                  <p><i>{community.description}</i></p>
                  <p>
                    {community._count.followers}
                    {' '}
                    followers |
                    {' '}
                    {community._count.posts}
                    {' '}
                    posts
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </HeadingWrapper>
  );
}
