import { Warning, Loop } from "@mui/icons-material";

import { useForm } from "../hooks/useForm";
import { Alert } from "./Alert";

export function Form<T>({
  destination,
  onClickSubmit,
  onSuccess,
  buttonText,
  children,
}: {
  destination: { endpoint: string; method: "GET" | "PUT" | "POST" | "DELETE" };
  onClickSubmit?: () => void;
  onSuccess: (
    // to run only when the request gets a 200
    submissionData: Record<string, string>, // do something with what you've given to the request
    submissionResult: T // do something with what you've received from the request
  ) => void;
  buttonText: string;
  children: Array<JSX.Element | boolean>;
}) {
  const { loading, error, inputErrors, handleSubmit } = useForm<T>(
    destination,
    onSuccess
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error ? (
        <Alert type="warning">
          <p>{error}</p>
        </Alert>
      ) : (
        ""
      )}
      {/* todo: success or error message paragraph component */}

      {children
        .filter((c) => c)
        .map((child) => {
          if (typeof child !== "boolean" && child.type === "label") {
            return (
              <label
                {...child.props}
                key={child.props.htmlFor}
                className="form-label"
              >
                {child.props.children.filter(
                  (child: JSX.Element) => child.type === "span"
                )}
                {inputErrors && child.props.htmlFor in inputErrors ? (
                  <small className="form-error">
                    <Warning />
                    {inputErrors[child.props.htmlFor]}
                  </small>
                ) : (
                  ""
                )}
                {child.props.children.filter(
                  (child: JSX.Element) => child.type !== "span"
                )}
              </label>
              // would love to find an alternate solution to copying children and attributes
              // as quick and convenient as this, because i hear prop spreading is not very savory
            );
          }

          return child;
        })}

      <hr />

      <button
        className="button accent-1"
        type="submit"
        disabled={loading}
        onClick={() => {
          if (onClickSubmit) onClickSubmit();
        }}
      >
        {loading ? (
          <>
            <Loop className="spin" />
            <span>Processing...</span>
          </>
        ) : (
          <span>{buttonText}</span>
        )}
      </button>
    </form>
  );
}
