import Error from '../../assets/svg/error.svg?react';
import Warning from '../../assets/svg/warning.svg?react';
import Success from '../../assets/svg/success.svg?react';

export default function Alert({ type, message } : {
  type: 'success' | 'warning' | 'error',
  message: string
}) {
  return (
    <div className="alert flex-row">
      {type === 'error' && <Error />}
      {type === 'warning' && <Warning />}
      {type === 'success' && <Success />}
      <p>
        {message}
      </p>
    </div>
  );
}
