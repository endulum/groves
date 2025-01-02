import { useEffect, useState, useRef } from "react";

import { getStoredToken, clearStoredToken } from "../functions/tokenUtils";
import { doFetch } from "../functions/doFetch";
import { type UserWithBio } from "../types";

export function useUser(): {
  loading: boolean;
  error: string | null;
  user: UserWithBio | null;
  initUser: () => Promise<void>;
  changeUsername: (username: string) => void;
} {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserWithBio | null>(null);
  const fetching = useRef<boolean>(false);

  async function initUser() {
    if (user) setUser(null);
    if (error) setError(null);
    if (!loading) setLoading(true);

    const token = getStoredToken();

    const fetchResult = await doFetch<UserWithBio>("/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (fetchResult.error !== null) {
      if (![401, 403, 404].includes(fetchResult.status))
        setError(fetchResult.error);
      else {
        clearStoredToken();
      }
    } else setUser(fetchResult.data);

    setLoading(false);
    fetching.current = false;
  }

  function changeUsername(username: string) {
    if (user) setUser({ ...user, username });
  }

  useEffect(() => {
    if (fetching.current === false) {
      fetching.current = true;
      initUser();
    }
  }, []);

  return {
    loading,
    error,
    user,
    initUser,
    changeUsername,
  };
}
