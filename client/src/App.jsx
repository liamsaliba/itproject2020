import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";

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
      <Router primary={false}>
        <User path="/u/:userId" />
        <Editor path="/editor" />
        <Main path="/*" />
      </Router>
      <ToastContainer position="bottom-center" />
    </Provider>
  );
};
