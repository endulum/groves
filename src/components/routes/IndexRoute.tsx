import { useDocumentTitle } from "usehooks-ts";
import { toast } from "react-toastify";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>

      <button
        type="button"
        className="button primary"
        onClick={() => {
          toast(
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque dicta hic.
            </p>,
            {
              className: "custom-toast",
              type: "warning",
            }
          );
        }}
      >
        Toast
      </button>
    </>
  );
}
