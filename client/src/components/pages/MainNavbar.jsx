/** @jsx jsx */
import { jsx, Box, Flex, NavLink } from "theme-ui";
import React from "react";

export default () => {
  return (
    <Box pb={20}>
      <Flex as="nav">
        <NavLink to="/" p={2}>
          Home
        </NavLink>
        <NavLink to="/demo" p={2}>
          Demo
        </NavLink>
        <NavLink to="/about" p={2}>
          Login
        </NavLink>
        <NavLink to="/about" p={2}>
          Sign up
        </NavLink>
        <NavLink to="/about" p={2}>
          About
        </NavLink>
      </Flex>
    </Box>
  );
};
