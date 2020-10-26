/** @jsx jsx */
import { jsx } from "theme-ui";
import * as MenuItems from "./NavItems";
import { Menu } from "semantic-ui-react";

const Left = props => (
  <Menu.Menu
    {...props}
    position="left"
    sx={{
      ...props.sx,
      alignItems: "center",
      flex: props.size ?? 1,
      justifyContent: "flex-start",
    }}
    secondary
  />
);

const Center = props => (
  <Menu.Menu
    {...props}
    sx={{
      ...props.sx,
    }}
    secondary
  />
);

const Right = props => (
  <Menu.Menu
    {...props}
    position="right"
    sx={{
      ...props.sx,
      alignItems: "center",
      flex: props.size ?? 1,
      justifyContent: "flex-end",
    }}
    secondary
  />
);

const Navbar = props => (
  <Menu
    p={2}
    {...props}
    sx={{
      ...props.sx,
      alignItems: "center",
      bg: props.bg ?? "background",
      padding: "0.75em 1em",
    }}
    secondary
  />
);

Navbar.Left = Left;
Navbar.Right = Right;
Navbar.Center = Center;
Navbar.Image = MenuItems.MenuImage;
Navbar.Button = MenuItems.MenuButton;
Navbar.Item = MenuItems.MenuItem;
Navbar.Link = MenuItems.Link;

export default Navbar;
