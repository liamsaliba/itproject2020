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
    tablet: 700,
    computer: 700,
  },
});
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const pageName = match => decodeURI(match.params.pageName);

export default () => {
  return (
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
        <MediaContextProvider>
          <Media greaterThan="tablet">
            <Route
              path="/editor/:pageName"
              render={({ match }) => <Editor selectedPage={pageName(match)} />}
            />
            <Route component={Editor} path="/editor" />
          </Media>
          <Media lessThan="tablet">
            <Route component={Main} path="*" />
            {/* <Route component={AccessDenied} path="/editor" /> */}
          </Media>
        </MediaContextProvider>
        <Route component={Main} path="*" />
      </Switch>
      <ToastContainer position="bottom-center" />
    </React.Fragment>
  );
};
