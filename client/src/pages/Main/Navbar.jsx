/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

import camel from "../../svg/camel.svg";

import { MenuItem, MenuButton, MenuImage } from "../../components";

export default () => {
  return (
    <Box p={2}>
      <Flex sx={{ alignItems: "center" }}>
        <MenuImage src={camel} to="/" />
        <Box mx="auto" />
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="themes">Themes</MenuItem>
        {/* <MenuItem to="about">About</MenuItem> */}
        {}
        <MenuItem to="login">Login</MenuItem>
        <MenuButton to="signup">Sign up</MenuButton>
      </Flex>
    </Box>
  );
};
