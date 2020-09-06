import React from "react";
import { Switch, Route } from "react-router-dom";

import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

import About from "./About";
import Login from "./Login";
import SignUp from "./SignUp";
import Landing from "./Landing";
import Demo from "../demo/Demo";
import NotFound from "./NotFound";

import { ThemeProvider } from "theme-ui";
import theme from "../themes/Main.theme";

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <MainNavbar />
      <Switch>
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/" component={Landing} />
        <Route component={NotFound} />
      </Switch>
      <MainFooter />
    </ThemeProvider>
  );
};
