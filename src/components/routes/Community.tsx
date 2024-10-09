import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingWrapper from '../reusable/LoadingWrapper';
import useGetRequest from '../../hooks/useGetRequest';
import PageWrapper from '../reusable/PageWrapper';

type Community = {
  urlName: string,
  canonicalName: string
};

export default function Community() {
  const { communityId } = useParams();
  const {
    loading, error, data, get,
  } = useGetRequest<Community>(`/community/${communityId}`);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  if (loading || error !== null) {
    return <LoadingWrapper loading={loading} error={error} />;
  }

  if (data) {
    return (
      <PageWrapper title={data.canonicalName}>
        <p>hi</p>
      </PageWrapper>
    );
  }
}
