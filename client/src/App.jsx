import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { RouteUser as User, Main, Editor } from "./pages";

import configureStore from "./store/configureStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route component={User} path="/u/:userId" />
        <Route component={Editor} path="/editor" />
        <Route component={Main} path="*" />
      </Switch>
      <ToastContainer position="bottom-center" />
    </Provider>
  );
};
