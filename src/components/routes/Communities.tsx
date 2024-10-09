import { Link } from 'react-router-dom';
import PageWrapper from '../reusable/PageWrapper';
import LoadingWrapper from '../reusable/LoadingWrapper';
import useGetRequest from '../../hooks/useGetRequest';
import { type Communities } from '../../types';

export default function Communities() {
  const {
    loading, error, data,
  } = useGetRequest<{ areYouSignedIn: boolean, communities: Communities }>('/communities');

  return (
    <PageWrapper title="Communities">
      {(loading || error !== null) && (
        <LoadingWrapper loading={loading} error={error} />
      )}
      {data !== null && (
        <div className="sidebar-view flex-row">
          <div className="communities flex-col">
            {data.communities.map((community) => (
              <Link className="community-link" key={community.urlName} to={`/community/${community.urlName}`}>
                <div className="community">
                  <h3>{community.canonicalName}</h3>
                  <small>
                    /
                    {community.urlName}
                    {' '}
                    |
                    {' '}
                    {community._count.followers}
                    {' '}
                    followers
                    {' '}
                    |
                    {' '}
                    Last active
                    {' '}
                    {community.lastActivity}
                  </small>
                  <p>{community.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="sidebar">
            owo?
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
