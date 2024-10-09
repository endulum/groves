import { useDocumentTitle } from 'usehooks-ts';
import { type User } from '../../types';
import PageWrapper from '../reusable/PageWrapper';

export default function Index({ user } : {
  user: User | null
}) {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME} :: Index`);
  return (
    <PageWrapper title="Home">
      {user ? (
        <p>Welcome back!</p>
      ) : (
        <p>Welcome! Please sign up or log in.</p>
      )}
    </PageWrapper>
  );
}
