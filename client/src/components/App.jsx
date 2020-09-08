import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";

import "./App.css";

import User from "./User/Main";
import Main from "./Main/Main";
import Editor from "./editor/Editor";
import { ThemeProvider } from "theme-ui";

import themes from "./themes";
import configureStore from "../store/configureStore";
import { login, logout } from "../store/auth";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const store = configureStore();

// store.dispatch(login("exradr", "suckmyballs"));
// const token = store.getState().auth.token;
// console.log("token", token);
// setTimeout(() => store.dispatch(logout(token)), 4000);

export default () => {
  const theme = themes.custom;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <User path="/u/:userId" />
          <Editor path="/e/:userId" />
          <Main path="/*" />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
