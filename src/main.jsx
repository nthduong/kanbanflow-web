// import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "~/assets/theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfirmProvider } from "material-ui-confirm";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: "xs" },
        confirmationButtonProps: { color: "primary", variant: "outlined" },
        cancellationButtonProps: { color: "inherit" },
        buttonOrder: ["confirm", "cancel"],
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer progressStyle={{ height: "4px" }} theme="light" />
    </ConfirmProvider>
  </CssVarsProvider>,
  // </React.StrictMode>,
);
