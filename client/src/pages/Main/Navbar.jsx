/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  Navbar,
  ProfileDropdown,
  Hamburger,
  Link,
} from "../../components";
import { useSelector } from "react-redux";

import { Button, Icon, Menu } from "semantic-ui-react";
import { useState } from "react";

export const MainHamburger = ({ children }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const menu = (
    <React.Fragment>
      <Menu.Item
        style={{ fontSize: "1.5em" }}
        to="themes"
        as={Link}
        onClick={() => setOpen(false)}
      >
        <Icon name="paint brush" />
        Themes
      </Menu.Item>
      <Menu.Item
        style={{ fontSize: "1.5em" }}
        to="browsePortfolios"
        as={Link}
        onClick={() => setOpen(false)}
      >
        <Icon name="book" />
        Browse
      </Menu.Item>
    </React.Fragment>
  );

  return (
    <Hamburger
      open={() => setOpen(true)}
      close={close}
      isOpen={open}
      menu={menu}
    >
      {children}
    </Hamburger>
  );
};

export const MainNavbar = () => {
  const auth = useSelector(state => state.auth);

  return (
    <Navbar>
      <Navbar.Left>
        <Flex sx={{ alignItems: "center" }}>
          <MenuCamel />
          <MenuItem style={{ fontSize: "1.2em" }} to="/">
            Camel Pages
          </MenuItem>
          <MenuItem style={{ fontSize: "1.2em" }} to="themes">
            Themes
          </MenuItem>
          <MenuItem style={{ fontSize: "1.2em" }} to="browsePortfolios">
            Browse
          </MenuItem>
          <Box mx="auto" />
        </Flex>
      </Navbar.Left>
      <Navbar.Right>
        {auth.token && (
          <React.Fragment>
            <MenuItem style={{ fontSize: "1.2em" }} to="/editor">
              <Icon name="edit" />
              Editor
            </MenuItem>
            <ProfileDropdown items="default" />
          </React.Fragment>
        )}
        {!auth.token && (
          <React.Fragment>
            <MenuButton animated to="login" primary>
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden>
                <Icon name="sign in" />
              </Button.Content>
            </MenuButton>
            <MenuButton animated to="signup" basic primary>
              <Button.Content visible>Sign up</Button.Content>
              <Button.Content hidden>
                <Icon name="signup" />
              </Button.Content>
            </MenuButton>
          </React.Fragment>
        )}
      </Navbar.Right>
    </Navbar>
  );
};

export default MainNavbar;
