import { useEffect } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";

import { useGet } from "../../hooks/useGet";
import { LoadingSpacer } from "../reusable/LoadingSpacer";
import { setStoredToken } from "../../functions/tokenUtils";

export function GithubRoute() {
  const location = useLocation();
  const code = location.search.split("=")[1];
  const { initUser } = useOutletContext<{ initUser: () => Promise<void> }>();
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
      <div className="w100">
        <LoadingSpacer
          loading={loading}
          error={error}
          customLoadingText="Authenticating with Github..."
        />
      </div>
    );
}
