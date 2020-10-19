/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  ProfileDropdown,
} from "../../components";
import { Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";

export default () => {
  const auth = useSelector(state => state.auth);

  return (
    // <Box p={2}>
    //   <Flex sx={{ alignItems: "center" }}>
    //     <MenuCamel />
    //     <MenuItem to="/">Camel Pages</MenuItem>
    //     <MenuItem to="themes">Themes</MenuItem>
    //     <Box mx="auto" />
    //     {auth.token && <ProfileDropdown items="default" />}
    //     {!auth.token && (
    //       <React.Fragment>
    //         <MenuButton to="login" primary>Login</MenuButton>
    //         <MenuButton to="signup" basic primary>Sign up</MenuButton>
    //       </React.Fragment>
    //     )}
    //   </Flex>
    // </Box>

    // <Box p={2}>
    <Menu>
      <MenuCamel />
      <MenuItem to="/">Camel Pages</MenuItem>
      <MenuItem to="themes">Themes</MenuItem>

      <Menu.Menu position="right">
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
      </Menu.Menu>
    </Menu>
    // </Box>
  );
};
