import React from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { User, Main, Editor } from "./pages";

import configureStore from "./store/configureStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const store = configureStore();

// store.dispatch(login("exradr", "suckmyballs"));
// const token = store.getState().auth.token;
// console.log("token", token);
// setTimeout(() => store.dispatch(logout(token)), 4000);

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
