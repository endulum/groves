import { useEffect, useState } from 'react';
// own imports
import { type User } from '../types';
import { getStoredToken, clearStoredToken } from '../functions/tokenUtils';
import doFetch from '../functions/doFetch';

export default function useInitUser(): {
  loading: boolean,
  error: string | null,
  user: User | null,
  initUser: () => Promise<void>
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function initUser() {
    if (user) setUser(null);
    if (error) setError(null);

    const token = getStoredToken();
    if (token === null) {
      setLoading(false); return;
    } if (!loading) setLoading(true);

    const fetchResult = await doFetch<User>(
      '/',
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    if (fetchResult.error !== null) {
      if (![401, 403, 404].includes(fetchResult.status)) setError(error);
      else {
        console.warn(error);
        clearStoredToken();
      }
    } else setUser(fetchResult.data);

    setLoading(false);
  }

  useEffect(() => { initUser(); }, []);

  return {
    loading, error, user, initUser,
  };
}
