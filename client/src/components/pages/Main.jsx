import React from "react";
import { Router } from "@reach/router";

import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

import About from "./About";
import Login from "./Login";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ThemeTest from "../demo/ThemeTest";
import NotFound from "./NotFound";

import { ThemeProvider } from "theme-ui";
import theme from "../themes/Main.theme";

export default () => {
  return (
    <ThemeProvider theme={theme}>
      <MainNavbar />
      <Router>
        <About path="/about" />
        <Login path="/login" />
        <SignUp path="/signup" />
        <ThemeTest path="/themes" />
        <Landing path="/" />
        <NotFound default />
      </Router>

      <MainFooter />
    </ThemeProvider>
  );
};
