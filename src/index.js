import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "slick-carousel/slick/slick.css";
import App from "./App";
import { StateProvider } from "./contexts/StateContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { AssetsProvider } from "./contexts/AssetsContext";
import { VaultProvider } from "./contexts/VaultContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <StateProvider>
    <ProfileProvider>
      <VaultProvider>
      <AssetsProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </AssetsProvider>
      </VaultProvider>
    </ProfileProvider>
  </StateProvider>
  // </React.StrictMode>
);
