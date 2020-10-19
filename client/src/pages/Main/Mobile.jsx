/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MenuCamel } from "../../components";
import { ProfileIcon } from "../../components/ProfileIcon";
import { Link } from "../../components/NavItems";
import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";
import { selectUser } from "../../store";

export default props => {
  const auth = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        onHide={() => setOpen(false)}
        vertical
        visible={open}
      >
        <Menu.Item
          style={{ fontSize: "1.9em", fontWeight: "bold" }}
          as={Link}
          to="/"
          onClick={() => setOpen(false)}
        >
          <Flex sx={{ alignItems: "center" }}>
            <MenuCamel />
            Camel Case
            <Box mx="auto" />
          </Flex>
        </Menu.Item>
        {auth.token && (
          <Menu.Item
            style={{ fontSize: "1.25em" }}
            as={Link}
            to={`/u/${user.username}`}
          >
            <Flex sx={{ alignItems: "center" }}>
              <ProfileIcon userId={user.userId} />
              <span sx={{ p: "0.2em" }} />
              {user.firstName} {user.lastName}
              <Box mx="auto" />
            </Flex>
          </Menu.Item>
        )}
        <Menu.Item as={Link} to="themes" onClick={() => setOpen(false)}>
          <Icon name="paint brush" />
          Themes
        </Menu.Item>
        {auth.token && (
          <Menu.Item as={Link} to="/logout" onClick={() => setOpen(false)}>
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        )}
        {!auth.token && (
          <React.Fragment>
            <Menu.Item as={Link} to="login" onClick={() => setOpen(false)}>
              <Icon name="sign in" />
              Login
            </Menu.Item>
            <Menu.Item as={Link} to="signup" onClick={() => setOpen(false)}>
              <Icon name="signup" />
              Sign up
            </Menu.Item>
          </React.Fragment>
        )}
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <Container>
          <Menu secondary size="large">
            <Menu.Item onClick={setOpen}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu>
        </Container>
        {props.body}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
