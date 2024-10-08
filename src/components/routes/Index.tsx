import { useDocumentTitle } from 'usehooks-ts';
import { type User } from '../../types';

export default function Index({ user } : {
  user: User | null
}) {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME} :: Index`);
  return user ? (
    <p>Welcome back!</p>
  ) : (
    <p>Welcome! Please sign up or log in.</p>
  );
}
