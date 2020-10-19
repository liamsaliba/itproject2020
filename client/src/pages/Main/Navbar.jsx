/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  Navbar,
  ProfileDropdown,
} from "../../components";
import { useSelector } from "react-redux";

export default () => {
  const auth = useSelector(state => state.auth);

  return (
    <Navbar>
      <Navbar.Left>
        <Flex sx={{ alignItems: "center" }}>
          <MenuCamel />
          <MenuItem to="/">Camel Case</MenuItem>
          <MenuItem to="themes">Themes</MenuItem>
          <Box mx="auto" />
        </Flex>
      </Navbar.Left>
      <Navbar.Right>
        {auth.token && <ProfileDropdown items="default" />}
        {!auth.token && (
          <React.Fragment>
            <MenuButton to="login" primary>
              Login
            </MenuButton>
            <MenuButton to="signup" basic primary>
              Sign up
            </MenuButton>
          </React.Fragment>
        )}
      </Navbar.Right>
    </Navbar>
  );
};
