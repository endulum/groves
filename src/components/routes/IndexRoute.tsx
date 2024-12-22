import { useDocumentTitle } from "usehooks-ts";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>
    </>
  );
}
