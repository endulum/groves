import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Warning, CheckCircle, Info } from "@mui/icons-material";

import { App } from "./App";
import "./assets/reset.css";
import "./assets/buttons.css";
import "./assets/utility.css";
import "./assets/main.css";

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="bottom-left"
          icon={({ type }) => {
            // theme is not used in this example but you could
            switch (type) {
              case "info":
                return <Info style={{ color: "var(--info)" }} />;
              case "success":
                return <CheckCircle style={{ color: "var(--success)" }} />;
              case "warning":
                return <Warning style={{ color: "var(--warning)" }} />;
              default:
                return null;
            }
          }}
        />
      </BrowserRouter>
    </React.StrictMode>
  );
}
