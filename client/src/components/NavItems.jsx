/** @jsx jsx */
import { jsx, Button, NavLink } from "theme-ui";
import { Link as ReachLink } from "@reach/router";

export const MenuItem = ({ to, children }) => (
  <NavLink as={ReachLink} activeClassName="active" to={to} p={2}>
    {children}
  </NavLink>
);

export const MenuButton = ({ to, children }) => (
  <Button as={ReachLink} variant="outline" to={to} ml={2} p={2}>
    {children}
  </Button>
);
