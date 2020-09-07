/** @jsx jsx */
import { jsx, Box, Avatar, Flex } from "theme-ui";

import camel from "../../svg/camel.svg";

import { MenuItem, MenuButton } from "../NavItems";

export default () => {
  return (
    <Box p={10}>
      <Flex as="nav">
        <Avatar src={camel} />
        <Box mx="auto" />
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="themes">Themes</MenuItem>
        <MenuItem to="about">About</MenuItem>
        <MenuItem to="login">Login</MenuItem>
        <MenuButton to="signup">Sign up</MenuButton>
      </Flex>
    </Box>
  );
};
