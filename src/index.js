import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./contexts/StateContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { AssetsProvider } from "./contexts/AssetsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider>
      <ProfileProvider>
        <AssetsProvider>
          <App />
        </AssetsProvider>
      </ProfileProvider>
    </StateProvider>
  </React.StrictMode>
);
