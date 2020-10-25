import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { User, Main, Editor } from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default () => {
  return (
    <React.Fragment>
      <Switch>
        <Route
          path="/u/:userId/:pageName"
          render={({ match }) => (
            <User
              userId={match.params.userId}
              selectedPage={match.params.pageName}
            />
          )}
        />
        <Route
          path="/u/:userId"
          render={({ match }) => <User userId={match.params.userId} />}
        />
        <Route
          path="/editor/:pageName"
          render={({ match }) => (
            <Editor selectedPage={match.params.pageName} />
          )}
        />
        <Route component={Editor} path="/editor" />
        <Route component={Main} path="*" />
      </Switch>
      <ToastContainer position="bottom-center" />
    </React.Fragment>
  );
};
