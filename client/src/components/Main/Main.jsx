/** @jsx jsx */

import { Router } from "@reach/router";

import MainNavbar from "./Navbar";
import MainFooter from "./Footer";

import About from "./About";
import Login from "./Login";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ThemeTest from "../demo/ThemeTest";
import NotFound from "./NotFound";

import { jsx, Flex } from "theme-ui";

export default () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <header>
        <MainNavbar />
      </header>
      <main
        sx={{
          flex: "1 1 auto",
          display: "flex",
        }}
      >
        <Router>
          <About path="/about" />
          <Login path="/login" />
          <SignUp path="/signup" />
          <ThemeTest path="/themes" />

          <Landing path="/" />
          <NotFound default />
        </Router>
      </main>
      <footer>
        <MainFooter />
      </footer>
    </Flex>
  );
};
