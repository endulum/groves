// own imports
import useFormRequest from '../../hooks/useFormRequest';

export default function Form<T>({
  destination, onSuccess, buttonText, children,
}: {
  destination: { endpoint: string, method: 'POST' | 'PUT' },
  onSuccess: (formData: Record<string, string>, fetchResult: T) => void,
  buttonText: string
  children: JSX.Element[]
}) {
  const {
    loading, error, inputErrors, handleSubmit,
  } = useFormRequest<T>(destination, onSuccess);

  return (
    <form onSubmit={handleSubmit}>
      {error ? <p>{error}</p> : ''}
      {/* todo: success message paragraph */}

      {children.map((child) => {
        if (child.type === 'label') {
          return (
            // control association is already covered by the spread props
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label {...child.props} key={child.props.htmlFor}>
              {child.props.children}
              {inputErrors && child.props.htmlFor in inputErrors ? (
                <small>{inputErrors[child.props.htmlFor]}</small>
              ) : ''}
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
