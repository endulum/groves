import { useState } from 'react';
// own imports
import doFetch from '../functions/doFetch';
import { getStoredToken } from '../functions/tokenUtils';

type InputErrors = Array<{ path: string, value: string, msg: string }>;

export default function useFormRequest<T>(
  destination: { endpoint: string, method: 'PUT' | 'POST' | 'DELETE' },
  onSuccess: (
    formData: Record<string, string>, fetchResult: T
  ) => void,
): {
    loading: boolean,
    error: string | null,
    inputErrors: Record<string, string> | null,
    handleSubmit: (event: React.FormEvent) => Promise<void>
  } {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // one error message atop the form
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  // error messages per input

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const token = getStoredToken();

    // build a formData object by gathering values
    // from the event's own target, which is the HTML form
    const formData: Record<string, string> = {};
    Object.values(event.target).forEach((inputElement) => {
      if (inputElement instanceof HTMLInputElement) {
        formData[inputElement.id] = inputElement.value;
      }
    });

    // start the request
    setLoading(true);
    setError(null);
    setInputErrors({});
    const fetchResult = await doFetch<T | { errors: InputErrors }>(
      destination.endpoint,
      {
        method: destination.method,
        headers: {
          'Content-type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(formData),
      },
    );
    setLoading(false);

    if (fetchResult.error) setError(fetchResult.error);
    if (
      fetchResult.status === 400
      && typeof fetchResult.data === 'object'
      && fetchResult.data !== null
      && 'errors' in fetchResult.data
    ) {
      const inputErrorRecord: Record<string, string> = {};
      (fetchResult.data.errors as InputErrors).forEach((inputError) => {
        inputErrorRecord[inputError.path] = inputError.msg;
      });
      setInputErrors(inputErrorRecord);
    } else if (fetchResult.status === 200) {
      onSuccess(formData, fetchResult.data as T);
    }
  }

  return {
    loading, error, inputErrors, handleSubmit,
  };
}
