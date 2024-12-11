import { ofetch, FetchError } from "ofetch";

// function handleError(err: unknown): string {
//   if (err instanceof TypeError) {
//     return "A network error occurred. Try again later.";
//   }
//   if (err instanceof Error && err.message !== "") {
//     return err.message;
//   }
//   console.error(err);
//   return "Sorry, something went wrong when handling your request.";
// }

export async function doFetch<T>(
  endpoint: string,
  payload: object
): Promise<{
  data: T | null;
  status: number;
  error: string | null;
}> {
  let data = null;
  let status = 0;
  let error = null;
  try {
    const response = await ofetch(
      import.meta.env.VITE_API_URL + endpoint,
      payload
    );
    data = response as T;
    status = 200;
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.statusCode) status = e.statusCode;
      if (typeof e.data === "string") error = e.data;
      else {
        data = e.data;
        if (status === 0) error = "A network error occurred. Try again later.";
        else error = e.statusText ?? "Something went wrong when fetching data.";
      }
    } else {
      console.error(e);
      error = "Something went wrong when fetching data.";
    }
  }
  return { data, status, error };
}
