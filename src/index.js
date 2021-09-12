import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import "./css/common.css";
import "./css/index.css";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
