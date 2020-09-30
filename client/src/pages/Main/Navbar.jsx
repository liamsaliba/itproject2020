/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  ProfileDropdown,
} from "../../components";
import { useSelector } from "react-redux";

export default () => {
  const auth = useSelector(state => state.auth);

  return (
    <Box p={2}>
      <Flex sx={{ alignItems: "center" }}>
        <MenuCamel />
        <MenuItem to="/">Camel Pages</MenuItem>
        <MenuItem to="themes">Themes</MenuItem>
        <Box mx="auto" />
        {auth.token && <ProfileDropdown items="default" />}
        {!auth.token && (
          <React.Fragment>
            <MenuItem to="login">Login</MenuItem>
            <MenuButton to="signup">Sign up</MenuButton>
          </React.Fragment>
        )}
      </Flex>
    </Box>
  );
};
