/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import * as MenuItems from "./NavItems";

const flexStyles = {
  flex: 1,
  display: "flex",
  alignItems: "center",
};

const Left = props => (
  <Flex
    {...props}
    sx={{
      ...props.sx,
      ...flexStyles,
      flex: props.size ?? 1,
      justifyContent: "flex-start",
    }}
  />
);

const Center = props => (
  <Flex
    {...props}
    sx={{
      ...props.sx,
      ...flexStyles,
      flex: props.size ?? 1,
      justifyContent: "center",
    }}
  />
);

const Right = props => (
  <Flex
    {...props}
    sx={{
      ...props.sx,
      ...flexStyles,
      flex: props.size ?? 1,
      justifyContent: "flex-end",
    }}
  />
);

const Navbar = props => (
  <Flex
    p={2}
    {...props}
    sx={{
      ...props.sx,
      alignItems: "center",
      bg: props.bg ?? "background",
    }}
  />
);

Navbar.Left = Left;
Navbar.Right = Right;
Navbar.Center = Center;
Navbar.Image = MenuItems.MenuImage;
Navbar.Button = MenuItems.MenuButton;
Navbar.Item = MenuItems.MenuItem;

export default Navbar;
