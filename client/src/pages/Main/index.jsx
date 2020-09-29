/** @jsx jsx */

import { Switch, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import About from "./About";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ThemeTest from "../demo/ThemeTest";
import NotFound from "./NotFound";

import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
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
        <Flex
          variant="layout.centerflex"
          sx={{
            backgroundImage: "url('https://i.redd.it/jpx7gtsw5ye41.jpg')",
          }}
        >
          <Box p={5} sx={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
            <Switch>
              <Route component={Landing} exact path="/" />
              <Route component={About} exact path="/about" />
              <Route component={Login} exact path={["/login", "/signin"]} />
              <Route component={Logout} exact path={["/logout", "/signout"]} />
              <Route
                component={Logout}
                exact
                path={["/logout/all", "/signout/all"]}
              />
              <Route component={SignUp} exact path="/signup" />
              <Route component={ThemeTest} exact path="/themes" />
              <Route component={NotFound} path="*" />
            </Switch>
          </Box>
        </Flex>
        <Footer as="footer" />
      </Flex>
    </ThemeProvider>
  );
};
