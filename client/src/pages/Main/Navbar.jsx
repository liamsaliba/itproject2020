/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  ProfileIcon,
  ProfileDropdown,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default () => {
  const auth = useSelector(state => state.auth);

  return (
    <Box p={2}>
      <Flex sx={{ alignItems: "center" }}>
        <MenuCamel />
        <MenuItem to="/">Camel Pages</MenuItem>
        <MenuItem to="themes">Themes</MenuItem>
        <Box mx="auto" />
        {auth.token && (
          <ProfileDropdown
            items={[
              { icon: "edit", text: "Editor", as: Link, to: "/editor" },
              {
                icon: "user circle",
                text: "Portfolio",
                as: Link,
                to: `u/${auth.user.username}`,
              },
            ]}
          />
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
