/** @jsx jsx */

import { Switch, Route } from "react-router-dom";

import About from "./About";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Landing from "./Landing";
import ThemeTest from "../demo/ThemeTest";
import NotFound from "./NotFound";

import { jsx } from "theme-ui";
import Layout from "./Layout";

export default () => {
  return (
    <Layout>
      <Switch>
        <Route component={Landing} exact path="/" />
        <Route component={About} exact path="/about" />
        <Route component={Login} exact path={["/login", "/signin"]} />
        <Route component={Login} path={"/login/:userId"} />
        <Route component={Logout} exact path={["/logout", "/signout"]} />
        <Route
          component={Logout}
          exact
          path={["/logout/all", "/signout/all"]}
        />
        <Route component={SignUp} exact path="/signup" />
        <Route component={SignUp} path="/signup/:userId" />
        <Route component={ThemeTest} exact path="/themes" />
        <Route component={NewPortfolio} exact path="/new" />
        <Route component={NotFound} path="*" />
      </Switch>
    </Layout>
  );
};
