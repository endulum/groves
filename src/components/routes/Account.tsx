import { useState } from 'react';
import Form from '../reusable/Form';
import InputRequirements from '../reusable/InputRequirements';
import HeadingWrapper from '../reusable/HeadingWrapper';
import Alert from '../reusable/Alert';
import { User } from '../../types';

export default function Account({ user, setUser }: {
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}) {
  const [success, setSuccess] = useState<boolean>(false);
  return (
    <HeadingWrapper title="Account Settings">
      <Form
        destination={{ endpoint: '/me', method: 'PUT' }}
        onSubmit={() => {
          if (success) setSuccess(false);
        }}
        onSuccess={(formData) => {
          setSuccess(true);
          if (formData.username !== user.username) {
            setUser({ ...user, username: formData.username });
          }
          if (formData.bio !== user.bio) {
            setUser({ ...user, bio: formData.bio });
          }
        }}
        buttonText="Submit"
      >
        {success && <Alert type="success" message="Your details have been successfully changed." />}
        <h3>Basic Details</h3>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="username">
          <span>Username</span>
          <InputRequirements
            input={<input type="text" id="username" defaultValue={user.username} />}
            requirements={[
              {
                description: 'Must be between 2 and 32 characters in length',
                function: (x: string) => x.length >= 2 && x.length <= 32,
              }, {
                description: 'Must contain only lowercase letters, numbers, and hyphens',
                function: (x: string) => x.match(/^[a-z0-9-]+$/g) !== null,
              },
            ]}
          />
        </label>

        <label htmlFor="bio">
          <span>Bio</span>
          <textarea id="bio" defaultValue={user.bio} maxLength={200} />
        </label>

        <div>
          <h3>Password</h3>
          <p>Leave this area blank if you do not wish to change your password.</p>
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="password">
          <span>New password</span>
          <InputRequirements
            input={<input type="password" id="password" />}
            requirements={[
              {
                description: 'Must be 8 or more chatacters long',
                function: (x: string) => x.length >= 8,
              },
            ]}
          />
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
    </HeadingWrapper>
  );
}
