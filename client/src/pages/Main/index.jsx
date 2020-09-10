/** @jsx jsx */

import { Router } from "@reach/router";

import Navbar from "./Navbar";
import Footer from "./Footer";

import About from "./About";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ThemeTest from "../demo/ThemeTest";
import NotFound from "./NotFound";

import { jsx, Flex, ThemeProvider } from "theme-ui";
import themes from "../../themes";

export default () => {
  const theme = themes.custom;

  return (
    <ThemeProvider theme={theme}>
      <Flex
        sx={{
          flexDirection: "column",
          // ensure the screen is always filled (footer isn't floating)
          minHeight: "100vh",
        }}
      >
        <Navbar as="header" />
        <Router component={Flex} variant="layout.centerflex" primary={false}>
          <About path="/about" />
          <Login path="/login" />
          {/* an alias */}
          <Login path="/signin" />
          <Logout path="/logout" />
          <Logout path="/signout" />
          <SignUp path="/signup" />
          <ThemeTest path="/themes" />
          <Landing path="/" />
          <NotFound default />
        </Router>
        <Footer as="footer" />
      </Flex>
    </ThemeProvider>
  );
};
