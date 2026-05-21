import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "~/assets/theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmProvider } from "material-ui-confirm";

import { store } from "~/redux/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
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
    </CssVarsProvider>
  </Provider>,
);
