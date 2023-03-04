import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/style.css";
import "./assets/css/default.css";
import "./assets/css/dashboard.css";
import "./assets/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import AppI18n from "./AppI18n";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "./store";
import { ModalContainer } from "./components/Modal";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppI18n />
      <ModalContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
