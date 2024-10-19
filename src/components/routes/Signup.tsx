import Form from '../reusable/Form';
import HeadingWrapper from '../reusable/HeadingWrapper';
import InputRequirements from '../reusable/InputRequirements';

export default function Signup({ signUp }: {
  signUp: (username: string) => void
}) {
  return (
    <HeadingWrapper title="Sign Up">
      <Form<null>
        destination={{ endpoint: '/signup', method: 'POST' }}
        onSuccess={(formData) => {
          signUp(formData.username);
        }}
        buttonText="Log In"
      >
        {/* control association is already covered by the spread props */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="username">
          <span>Username</span>
          <InputRequirements
            input={<input type="text" id="username" autoComplete="off" />}
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
        {/* control association is already covered by the spread props */}
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="password">
          <span>Password</span>
          <InputRequirements
            input={<input type="password" id="password" autoComplete="off" />}
            requirements={[
              {
                description: 'Must be 8 or more chatacters long',
                function: (x: string) => x.length >= 8,
              },
            ]}
          />
        </label>
        <label htmlFor="confirmPassword">
          <span>Confirm password</span>
          <input type="password" id="confirmPassword" autoComplete="off" />
        </label>
      </Form>
    </HeadingWrapper>
  );
}
