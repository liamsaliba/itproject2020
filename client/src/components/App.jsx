import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import User from "./portfolio/User";
import Main from "./pages/Main";
import Editor from "./editor/Editor";
import { ThemeProvider } from "theme-ui";

import themes from "./themes";

export default () => {
  const theme = themes.dark;

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
