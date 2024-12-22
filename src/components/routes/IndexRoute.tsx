import { useState } from "react";
import { useDocumentTitle } from "usehooks-ts";
import { useLogger } from "../../hooks/useLogger";

export function IndexRoute() {
  useDocumentTitle(`${import.meta.env.VITE_APP_NAME}`);
  return (
    <>
      <h2>Home</h2>
    </>
  );
}
