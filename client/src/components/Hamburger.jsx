/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React from "react";
import { useSelector } from "react-redux";
import { Link, SidebarCamel } from "./NavItems";
import { ProfileIcon } from "./ProfileIcon";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { selectToken, selectUser } from "../store";

export const Hamburger = props => {
  const { close, isOpen, open, children, menu } = props;
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const userMenu = token ? (
    <React.Fragment>
      <Menu.Item disabled style={{ fontSize: "1.5em", marginTop: "3em" }} />
      <Menu.Item>
        <Menu.Header style={{ fontSize: "1.5em", fontWeight: "bold" }}>
          <Flex sx={{ alignItems: "center" }}>
            <ProfileIcon userId={user.userId} />
            <span sx={{ p: "0.2em" }} />
            {user.firstName} {user.lastName}
            <Box mx="auto" />
          </Flex>
        </Menu.Header>
        <Menu.Menu style={{ fontSize: "1.5em" }}>
          <Menu.Item as={Link} to={`/u/${user.username}`} onClick={close}>
            <Icon name="address card" />
            Portfolio
          </Menu.Item>
          <Menu.Item as={Link} to="/settings" onClick={close}>
            <Icon name="settings" />
            Settings
          </Menu.Item>
          <Menu.Item as={Link} to="/logout" onClick={close}>
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </React.Fragment>
  ) : null;

  const loginMenu = (
    <React.Fragment>
      <Menu.Item disabled style={{ fontSize: "1.5em", marginTop: "3em" }} />
      <Menu.Item
        style={{ fontSize: "1.5em" }}
        as={Link}
        to="../login"
        onClick={close}
      >
        <Icon name="sign in" />
        Login
      </Menu.Item>
      <Menu.Item
        style={{ fontSize: "1.5em" }}
        as={Link}
        to="../signup"
        onClick={close}
      >
        <Icon name="signup" />
        Sign up
      </Menu.Item>
    </React.Fragment>
  );

  const flexProps = {
    flexDirection: "column",
    // ensure the screen is always filled (footer isn't floating)
    minHeight: "100vh",
  };

  return (
    <React.Fragment>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          onHide={close}
          vertical
          visible={isOpen}
          sx={{ overflowX: "hidden" }}
        >
          <Menu.Item
            style={{ fontSize: "1.8em", fontWeight: "bold" }}
            as={Link}
            to="/"
            onClick={close}
          >
            <Flex sx={{ alignItems: "center" }}>
              <SidebarCamel />
              Camel Pages
              <Box mx="auto" />
            </Flex>
          </Menu.Item>
          {menu}
          {token ? userMenu : loginMenu}
        </Sidebar>
        <Sidebar.Pusher dimmed={isOpen}>
          <Flex sx={flexProps}>
            <Menu secondary size="large">
              <Menu.Item onClick={open}>
                <Icon
                  size="big"
                  floated="left"
                  sx={{ color: "text" }}
                  name="sidebar"
                />
              </Menu.Item>
            </Menu>
            {children}
          </Flex>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </React.Fragment>
  );
};

export default Hamburger;
