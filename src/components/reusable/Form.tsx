import useFormRequest from '../../hooks/useFormRequest';
import Alert from './Alert';

export default function Form<T>({
  destination, onSubmit = () => {}, onSuccess, buttonText, children,
}: {
  destination: { endpoint: string, method: 'POST' | 'PUT' },
  onSubmit?: () => void,
  onSuccess: (formData: Record<string, string>, fetchResult: T) => void,
  buttonText: string
  children: Array<JSX.Element | false>
}) {
  const {
    loading, error, inputErrors, handleSubmit,
  } = useFormRequest<T>(destination, onSuccess);

  return (
    <form
      className="flex-col"
      onSubmit={(e) => {
        handleSubmit(e);
        onSubmit();
      }}
    >
      {error ? <Alert type="error" message={error} /> : ''}

      {children.map((child) => {
        if (child && child.type === 'label') {
          return (
            // control association is already covered by the spread props
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label {...child.props} key={child.props.htmlFor} className="flex-col">
              {child.props.children.filter((c: { type: string }) => ['span', 'input', 'textarea'].includes(c.type))}
              {inputErrors && child.props.htmlFor in inputErrors ? (
                <small>{inputErrors[child.props.htmlFor]}</small>
              ) : ''}
              {child.props.children.filter((c: { type: string }) => !['span', 'input', 'textarea'].includes(c.type))}
            </label>
            // would love to find an alternate solution to copying children and attributes
            // as quick and convenient as this, because i hear prop spreading is not very savory
          );
        }

        return child;
      })}

      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : buttonText}
      </button>
    </form>
  );
}
