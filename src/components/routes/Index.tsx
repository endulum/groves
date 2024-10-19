import { type User } from '../../types';
import HeadingWrapper from '../reusable/HeadingWrapper';

export default function Index({ user } : {
  user: User | null
}) {
  return (
    <HeadingWrapper title="Index">
      {user ? (
        <p>Welcome back!</p>
      ) : (
        <p>Welcome! Please sign up or log in.</p>
      )}
    </HeadingWrapper>
  );
}
