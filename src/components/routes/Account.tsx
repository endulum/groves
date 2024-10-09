import { useDocumentTitle } from 'usehooks-ts';
import Form from '../reusable/Form';
import PageWrapper from '../reusable/PageWrapper';

export default function Account({ currentUsername }: {
  currentUsername: string
}) {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME} :: Account Settings`);
  return (
    <PageWrapper title="Account Settings">
      <Form
        destination={{ endpoint: '/account', method: 'POST' }}
        onSuccess={() => { console.log('yippee'); }}
        buttonText="Submit"
      >
        <label htmlFor="username">
          <span>Username</span>
          <input type="text" id="username" defaultValue={currentUsername ?? ''} />
        </label>

        <label htmlFor="password">
          <span>New password</span>
          <input type="password" id="password" />
        </label>

        <label htmlFor="confirmPassword">
          <span>Confirm new password</span>
          <input type="password" id="confirmPassword" />
        </label>

        <label htmlFor="currentPassword">
          <span>Current password</span>
          <input type="password" id="currentPassword" />
        </label>
      </Form>
    </PageWrapper>

  );
}
