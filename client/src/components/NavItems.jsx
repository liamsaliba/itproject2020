/** @jsx jsx */
import { jsx, Button, NavLink } from "theme-ui";
import { Link as ReachLink } from "@reach/router";

export const MenuItem = props => (
  <NavLink {...props} as={ReachLink} activeClassName="active" p={2}>
    {props.children}
  </NavLink>
);

export const MenuButton = props => (
  <Button {...props} as={ReachLink} variant="outline" ml={2} p={2}>
    {props.children}
  </Button>
);
