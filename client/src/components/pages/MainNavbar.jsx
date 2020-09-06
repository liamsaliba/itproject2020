/** @jsx jsx */
import { jsx, Box, Flex, NavLink } from "theme-ui";
import React from "react";
// import { NavLink } from "../Links";
import { Link as ReachLink } from "@reach/router";

// const Nav = (props) => {
//   console.log("to", props.to);
//   console.log("data", props.data);
//   console.log("props", props);
//   return (
//     <Link to={props.to}>
//       <NL {...props}>{props.data}</NL>
//     </Link>
//   );
// };

export default () => {
  return (
    <Box p={10}>
      <Flex as="nav">
        <NavLink as={ReachLink} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={ReachLink} to="themes" p={2}>
          Themes
        </NavLink>
        <NavLink as={ReachLink} to="about" p={2}>
          About
        </NavLink>
        <NavLink as={ReachLink} to="login" p={2}>
          Login
        </NavLink>
        <NavLink as={ReachLink} to="signup" p={2}>
          Sign up
        </NavLink>
      </Flex>
    </Box>
  );
};
