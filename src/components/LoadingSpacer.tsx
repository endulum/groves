import { Loop, Warning } from "@mui/icons-material";

export function LoadingSpacer({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}): JSX.Element | undefined {
  return (
    <div className="spacer">
      {error ? (
        <>
          <Warning />
          <p>{error}</p>
        </>
      ) : loading ? (
        <>
          <Loop className="spin" />
          <p>Loading...</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
