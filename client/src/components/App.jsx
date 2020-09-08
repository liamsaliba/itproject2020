import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import User from "./User/Main";
import Main from "./Main/Main";
import Editor from "./editor/Editor";
import { ThemeProvider } from "theme-ui";

import themes from "./themes";

export default () => {
  const theme = themes.custom;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <User path="/u/:userId" />
        <Editor path="/e/:userId" />
        <Main path="/*" />
      </Router>
    </ThemeProvider>
  );
};
