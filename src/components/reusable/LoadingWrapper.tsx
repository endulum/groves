export default function LoadingWrapper(
  { loading, error }: {
    loading: boolean
    error: string | null
  },
): JSX.Element | undefined {
  return (
    <div className="spacer flex-col">
      {loading ? (<p>Loading...</p>) : ''}
      {error !== null ? (<p>{error}</p>) : ''}
    </div>
  );
}
