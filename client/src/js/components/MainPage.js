import React from "react";
import { Switch, Route } from "react-router-dom";

import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

import AboutPage from "./AboutPage";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";

import { ThemeProvider } from "theme-ui";
import theme from "./Main.theme";

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <MainNavbar />
      <Switch>
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/" component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
      <MainFooter />
    </ThemeProvider>
  );
};
