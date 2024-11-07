import { useParams } from "react-router-dom"
import useGetRequest from "../../hooks/useGetRequest";
import LoadingWrapper from "../reusable/LoadingWrapper";
import HeadingWrapper from "../reusable/HeadingWrapper";
import useLogger from "../../hooks/useLogger";
import { DateTime } from 'luxon';

export default function User() {
  const { user } = useParams();

  const {
    loading, error, data
  } = useGetRequest<{
    username: string,
    bio: string,
    joined: string
  }>(`/user/${user}`);

  useLogger(data)

  if (loading === true || error !== null) {
    return <LoadingWrapper loading={loading} error={error} />;
  }

  if (data !== null) {
    return <HeadingWrapper title={user as string}>
      {data.bio !== '' && (<p>
        <i>{data.bio}</i>
      </p>)}
      <p>Joined {DateTime.fromISO(data.joined).toRelative()}</p>
    </HeadingWrapper>
  }
}