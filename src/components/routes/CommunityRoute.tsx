import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

import { useGet } from "../../hooks/useGet";
import { useLogger } from "../../hooks/useLogger";
import { LoadingSpacer } from "../LoadingSpacer";

export function CommunityRoute() {
  const { community } = useParams();
  const { loading, error, data } = useGet<{
    canonicalName: string;
    created: string;
  }>(`/community/${community}`);

  useLogger({ data });

  if (loading || error)
    return <LoadingSpacer loading={loading} error={error} />;
  if (data)
    return (
      <>
        <h2>{data.canonicalName}</h2>
        <p>
          Created{" "}
          {DateTime.fromISO(data.created).toLocaleString({
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </>
    );
}
