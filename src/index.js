import React from "react";
import ReactDOM from "react-dom";
import "./css/reset.css";
import "./css/common.css";
import "./css/index.css";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
