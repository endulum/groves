import { useState } from 'react';

export default function InputRequirements({ input, requirements } : {
  input: JSX.Element,
  requirements: Array<{
    description: string,
    function: (input: string) => boolean
  }>
}) {
  const [reqsVisible, setReqsVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <>
      <input
        {...input.props}
        onFocus={(e) => {
          if (!reqsVisible) {
            setInputValue(e.target.value);
            setReqsVisible(true);
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {reqsVisible ? (
        <ul>
          {requirements.map((req) => (
            <li key={req.description}>
              <p>
                {req.description}
                {' '}
                <small>
                  {req.function(inputValue) === true ? '(Good)' : '(Missing)'}
                </small>
              </p>
            </li>
          ))}
        </ul>
      ) : ''}
    </>
  );
}
