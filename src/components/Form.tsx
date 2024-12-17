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
    <form className="form flex-col align-start gap-1" onSubmit={handleSubmit}>
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
                className="form-label flex-col gap-0-5 align-start"
              >
                {child.props.children.filter(
                  (child: JSX.Element) => child.type === "span"
                )}
                {inputErrors && child.props.htmlFor in inputErrors ? (
                  <small className=" form-error flex-row gap-0-5">
                    <Warning style={{ color: "var(--warning)" }} />
                    {inputErrors[child.props.htmlFor]}
                  </small>
                ) : (
                  ""
                )}
                {child.props.children.filter(
                  (child: JSX.Element) => child.type !== "span"
                )}
              </label>
            );
          }

          return child;
        })}

      <button
        className="button primary"
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
