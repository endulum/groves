import { Link } from 'react-router-dom';
import { type User } from '../../types';
import HeadingWrapper from '../reusable/HeadingWrapper';

export default function Index({ user } : {
  user: User | null
}) {
  return (
    <HeadingWrapper title="Index">
      {user ? (
        <>
          <p>Welcome back!</p>
          <ul>
            <li><Link to="/account">Account settings</Link></li>
            <li><Link to="/communities">Explore communities</Link></li>
          </ul>
        </>
      ) : (
        <p>Welcome! Please sign up or log in.</p>
      )}
    </HeadingWrapper>
  );
}
