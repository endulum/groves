import { useDocumentTitle } from "usehooks-ts";

import { Alert } from "../Alert";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>

      {/* <LoadingSpacer loading={true} error={null} /> */}

      {["warning", "success", "info", "blind"].map((type) => (
        <Alert
          type={type as "warning" | "success" | "info" | "blind"}
          className="mt-1 mb-1"
        >
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
            voluptatibus optio inventore molestiae similique provident impedit
            at quis nesciunt consectetur. <a href="#">Learn more.</a>
          </p>
        </Alert>
      ))}

      <button className="button primary">
        <span>owo</span>
      </button>

      <button className="button plain">
        <span>owo</span>
      </button>

      <button className="button primary" disabled>
        <span>owo</span>
      </button>
    </>
  );
}
