import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import User from "./portfolio/User";
import Main from "./pages/Main";
import Editor from "./editor/Editor";

export default () => {
  return (
    <Switch>
      <Route exact path="/u/:id" component={User} />
      <Route exact path="/e/:id" component={Editor} />
      <Route component={Main} />
    </Switch>
  );
};
