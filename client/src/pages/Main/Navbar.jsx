/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React from "react";

import camel from "../../svg/camel.svg";

import { MenuItem, MenuButton, MenuImage } from "../../components";
import { useSelector } from "react-redux";

export default () => {
  const auth = useSelector(state => state.auth);

  return (
    <Box p={2}>
      <Flex sx={{ alignItems: "center" }}>
        <MenuImage src={camel} to="/" />
        <Box mx="auto" />
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="themes">Themes</MenuItem>
        {auth.token && (
          <React.Fragment>
            {/*will be user.profile */}
            <MenuImage src={camel} to="/profile" />
            <MenuItem to="profile">{auth.user.username}</MenuItem>
            <MenuItem to="logout">Logout</MenuItem>
          </React.Fragment>
        )}
        {!auth.token && (
          <React.Fragment>
            {/*will be user.profile */}
            <MenuItem to="login">Login</MenuItem>
            <MenuButton to="signup">Sign up</MenuButton>
          </React.Fragment>
        )}
      </Flex>
    </Box>
  );
};
