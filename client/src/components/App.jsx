import React from "react";
import { Router } from "@reach/router";

import "./App.css";

import User from "./portfolio/User";
import Main from "./pages/Main";
import Editor from "./editor/Editor";

export default () => {
  return (
    <Router>
      <User path="/u/:userId" />
      <Editor path="/e/:userId" />
      <Main path="/*" />
    </Router>
  );
};
