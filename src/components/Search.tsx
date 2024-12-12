import { useRef, useState, useEffect } from "react";
import { FirstPage, LastPage, VisibilityOff } from "@mui/icons-material";

import { useGet } from "../hooks/useGet";
import { useLogger } from "../hooks/useLogger";
import { LoadingSpacer } from "./LoadingSpacer";

interface PagedResults {
  links: {
    nextPage: string | null;
    prevPage: string | null;
  };
}

export function Search<T>({
  startingParams,
  endpoint,
  formContent,
  resultsPropertyName,
  mapResults,
}: {
  startingParams: Record<string, string>;
  endpoint: string;
  formContent: JSX.Element;
  resultsPropertyName: string;
  mapResults: (item: T) => JSX.Element;
}) {
  // delay between form changes
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  // keep params as an record outside of component flow
  const params = useRef<Record<string, string>>(startingParams);
  // turn params into query string
  const paramsToString = () => {
    const trimmedParams = Object.fromEntries(
      Object.entries(params.current).filter(([_key, value]) => value !== "")
    );
    return new URLSearchParams(trimmedParams).toString();
  };
  // use url as state
  const [url, setUrl] = useState(`${endpoint}?${paramsToString()}`);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (!params.current) return;
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      params.current = {
        ...params.current,
        [e.target.id]: e.target.value,
      };
      setUrl(`/communities?${paramsToString()}`);
    }, 750);
  };

  const { loading, error, data, get } = useGet<
    PagedResults & {
      [resultPropertyName: string]: Array<T>;
    }
  >(url);
  useLogger({ data });

  useEffect(() => {
    get(false);
  }, [url]);

  return (
    <>
      <h3>Search</h3>
      <form
        className="search"
        onSubmit={(e) => e.preventDefault}
        onChange={handleChange}
      >
        {formContent}
      </form>
      <hr />
      <div className="search-results">
        {data ? (
          data[resultsPropertyName].length > 0 ? (
            data[resultsPropertyName].map((result) => mapResults(result))
          ) : (
            <div className="spacer">
              <VisibilityOff />
              <p>No results found. Try another search.</p>
            </div>
          )
        ) : (
          <LoadingSpacer loading={loading} error={error} />
        )}
      </div>
      <div className="flex-row jc-spb">
        <button
          className="button accent-1"
          disabled={data == null || data?.links.prevPage === null}
          onClick={() => {
            if (data?.links.prevPage) setUrl(data.links.prevPage);
          }}
          title="Previous results"
        >
          <FirstPage />
        </button>
        <button
          className="button accent-1"
          disabled={data == null || data?.links.nextPage === null}
          onClick={() => {
            if (data?.links.nextPage) setUrl(data.links.nextPage);
          }}
          title="More results"
        >
          <LastPage />
        </button>
      </div>
    </>
  );
}
