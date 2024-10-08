import { useState, useEffect } from 'react';
// own imports
import doFetch from '../functions/doFetch';
import { getStoredToken } from '../functions/tokenUtils';

export default function useGetRequest<T>(endpoint: string): {
  loading: boolean,
  error: string | null,
  data: T | null
  get: (preserve: boolean) => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function get(preserve: boolean): Promise<void> {
    if (!preserve) {
      if (!loading) setLoading(true);
      if (error) setError(null);
      if (data) setData(null);
    }

    const token = getStoredToken();

    const fetchResult = await doFetch<T>(
      endpoint,
      {
        method: 'GET',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );

    setLoading(false);
    if (fetchResult.status === 200) setData(fetchResult.data);
    else setError(fetchResult.error);
  }

  useEffect(() => { get(false); }, []);

  return {
    loading, error, data, get,
  };
}
