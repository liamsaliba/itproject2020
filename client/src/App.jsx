import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import { User, Main, Editor } from "./pages";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMedia } from "@artsy/fresnel";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const pageName = match => decodeURI(match.params.pageName);

const desktopApp = (
  <React.Fragment>
    <Switch>
      <Route
        path="/u/:userId/:pageName"
        render={({ match }) => (
          <User userId={match.params.userId} selectedPage={pageName(match)} />
        )}
      />
      <Route
        path="/u/:userId"
        render={({ match }) => <User userId={match.params.userId} />}
      />
      <Route
        path="/editor/:pageName"
        render={({ match }) => <Editor selectedPage={pageName(match)} />}
      />
      <Route component={Editor} path="/editor" />
      <Route component={Main} path="*" />
    </Switch>
    <ToastContainer position="bottom-center" />
  </React.Fragment>
);

const mobileApp = (
  <React.Fragment>
    <Switch>
      <Route
        path="/u/:userId/:pageName"
        render={({ match }) => (
          <User userId={match.params.userId} selectedPage={pageName(match)} />
        )}
      />
      <Route
        path="/u/:userId"
        render={({ match }) => <User userId={match.params.userId} />}
      />
      {/* <Route component={NotFound} path="/editor" /> */}
      <Route component={Main} path="*" />
    </Switch>
    <ToastContainer position="bottom-center" />
  </React.Fragment>
);

export default () => {
  return (
    <MediaContextProvider>
      <Media greaterThan="tablet">{desktopApp}</Media>
      <Media at="tablet">{mobileApp}</Media>
      <Media lessThan="tablet">{mobileApp}</Media>
    </MediaContextProvider>
  );
};
