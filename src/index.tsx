import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// components
import App from "./App";
import ScrollToTop from "./components/scroll-to-top";
import { SettingsProvider } from "./components/settings";

import { AuthProvider } from "./auth/JwtContext";
// i18n
import "./locales/i18n";
// scroll bar
import "simplebar/src/simplebar.css";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
//CSS
import "../public/fonts/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const renderApp = (
  <AuthProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <HelmetProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </HelmetProvider>
    </LocalizationProvider>
  </AuthProvider>
);

if (process.env.NODE_ENV !== "production") {
  console.warn("Looks like we are in development mode!");
  console.info({
    MAXEN_CONNECT_API_LOCAL: process.env.MAXEN_CONNECT_API_LOCAL,
  });

  root.render(<React.StrictMode>{renderApp}</React.StrictMode>);
} else {
  root.render(renderApp);
}
