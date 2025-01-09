import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { setStoredToken } from "../../functions/tokenUtils";

export function GithubRoute({ initUser }: { initUser: () => Promise<void> }) {
  const location = useLocation();
  const code = location.search.split("=")[1];
  const navigate = useNavigate();

  const { loading, error, data } = useGet<{ token: string }>(
    `/github?code=${code}`
  );

  useEffect(() => {
    if (data && data.token) {
      setStoredToken(data.token);
      initUser();
      navigate("/feed");
    }
  }, [data]);

  if (loading || error)
    return (
      <LoadingSpacer
        loading={loading}
        error={error}
        customLoadingText="Authenticating with Github..."
      />
    );
}
