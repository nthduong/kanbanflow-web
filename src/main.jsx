import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "~/assets/theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ConfirmProvider } from "material-ui-confirm";
import GlobalStyles from "@mui/material/GlobalStyles";

import { store } from "~/redux/store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const persistor = persistStore(store);

import { injectStore } from "~/utils/authorizedAxios";
injectStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
            <GlobalStyles styles={{ a: { textDecoration: "none" } }} />
            <CssBaseline />
            <App />
            <ToastContainer progressStyle={{ height: "4px" }} theme="light" />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
);
