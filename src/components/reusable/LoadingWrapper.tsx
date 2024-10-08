export default function LoadingWrapper(
  { loading, error }: {
    loading: boolean
    error: string | null
  },
): JSX.Element | undefined {
  if (loading) return <p>Loading...</p>;
  if (error !== null) return <p>error</p>;
}
