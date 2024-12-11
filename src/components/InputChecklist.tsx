import { CheckCircle, Cancel } from "@mui/icons-material";

import { useState } from "react";

export function InputChecklist({
  input,
  requirements,
}: {
  input: JSX.Element;
  requirements: Array<{
    description: string;
    function: (input: string) => boolean;
  }>;
}) {
  const [reqsVisible, setReqsVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <>
      <input
        {...input.props}
        onFocus={(e) => {
          if (!reqsVisible) {
            setInputValue(e.target.value);
            setReqsVisible(true);
          }
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {reqsVisible ? (
        <ul className="form-input-checklist">
          {requirements.map((req) => (
            <li
              key={req.description}
              className={req.function(inputValue) === true ? "good" : "missing"}
            >
              {req.function(inputValue) === true ? (
                <CheckCircle aria-label="This requirement is fulfilled." />
              ) : (
                <Cancel aria-label="This requirement is missing." />
              )}
              <p>{req.description} </p>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
