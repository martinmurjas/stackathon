import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <HashRouter >
      <Router history={history}>
        <App />
      </Router>
    </HashRouter>
  </Provider>
);
