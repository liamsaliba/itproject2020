import React from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";

import "./App.css";

import { User, Main, Editor } from "./pages";
import { ThemeProvider } from "theme-ui";

import themes from "./themes";
import configureStore from "./store/configureStore";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const store = configureStore();

// store.dispatch(login("exradr", "suckmyballs"));
// const token = store.getState().auth.token;
// console.log("token", token);
// setTimeout(() => store.dispatch(logout(token)), 4000);

export default () => {
  const theme = themes.baseChakra;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <User path="/u/:userId" />
          <Editor path="/editor" />
          <Main path="/*" />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
