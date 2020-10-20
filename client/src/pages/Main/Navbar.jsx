/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React from "react";

import {
  MenuItem,
  MenuButton,
  MenuCamel,
  Navbar,
  ProfileDropdown,
} from "../../components";
import { useSelector } from "react-redux";

import { Button, Icon } from "semantic-ui-react";

export default () => {
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
