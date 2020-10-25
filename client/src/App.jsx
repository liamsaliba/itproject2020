import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { RouteUser as User, Main, Editor } from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectLoading } from "./store";
import { Dimmer, Loader } from "semantic-ui-react";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default () => {
  const loading = useSelector(selectLoading);
  return (
    <React.Fragment>
      <Dimmer active={loading.loading} inverted>
        <Loader inverted>{loading.text}</Loader>
      </Dimmer>
      <Switch>
        <Route component={User} path="/u/:userId" />
        <Route component={Editor} path="/editor" />
        <Route component={Main} path="*" />
      </Switch>
      <ToastContainer position="bottom-center" />
    </React.Fragment>
  );
};
