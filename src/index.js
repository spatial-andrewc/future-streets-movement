import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "@citydna/common";
import { DeckGLProvider, MapProvider } from "@citydna/maps";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DeckGLProvider>
      <MapProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </MapProvider>
    </DeckGLProvider>
  </React.StrictMode>,
  rootElement
);
