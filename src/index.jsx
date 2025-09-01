import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrivyProvider } from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

import { BrowserRouter } from "react-router-dom";

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      onSuccess={(user) => console.log(`User ${user.id} logged in!`)}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>
);
