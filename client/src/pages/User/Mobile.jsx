/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React, { useState } from "react";
import Body from "./Body";
import { selectPortfolioPages, selectToken, selectUser } from "../../store";
import { useSelector } from "react-redux";
import { Link } from "../../components/NavItems";
import { MenuItem, MenuCamel } from "../../components";
import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";
import { ProfileIcon } from "../../components/ProfileIcon";

export default props => {
  const { userId } = props;
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const sidebarItems = pages.map(page => (
    <Menu.Item
      key={page.pageId}
      link
      to={`#${page.name}`}
      as={Link}
      activeClassName="nactive"
      onClick={() => setOpen(false)}
      sx={{
        variant: "links.nav",
      }}
      smooth // smooth scroll to element
      p={2}
    >
      {page.name}
    </Menu.Item>
  ));

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        inverted
        onHide={() => setOpen(false)}
        vertical
        visible={open}
        attached="left"
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

        {token && (
          <Menu.Item>
            <Menu.Header style={{ fontSize: "2em", fontWeight: "bold" }}>
              <Flex sx={{ alignItems: "center" }}>
                <ProfileIcon userId={user.userId} />
                <span sx={{ p: "0.2em" }} />
                {user.firstName} {user.lastName}
                <Box mx="auto" />
              </Flex>
            </Menu.Header>
            <Menu.Menu style={{ fontSize: "1.5em" }}>
              <Menu.Item
                as={Link}
                to={`/u/${user.username}`}
                onClick={() => setOpen(false)}
              >
                <Icon name="address card" />
                Portfolio
              </Menu.Item>
              <Menu.Item as={Link} to="/logout" onClick={() => setOpen(false)}>
                <Icon name="sign out" />
                Logout
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        )}

        {!token && (
          <React.Fragment>
            <Menu.Item
              style={{ fontSize: "1.5em" }}
              as={Link}
              to="../login"
              onClick={() => setOpen(false)}
            >
              <Icon name="sign in" />
              Login
            </Menu.Item>
            <Menu.Item
              style={{ fontSize: "1.5em" }}
              as={Link}
              to="../signup"
              onClick={() => setOpen(false)}
            >
              <Icon name="signup" />
              Sign up
            </Menu.Item>
          </React.Fragment>
        )}
        <Menu.Item>
          <Menu.Header style={{ fontSize: "2em", fontWeight: "bold" }}>
            {userId}
          </Menu.Header>
          <Menu.Menu style={{ fontSize: "1.5em" }}>{sidebarItems}</Menu.Menu>
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <Container>
          <Menu secondary size="large">
            <Menu.Item secondary onClick={setOpen}>
              <Icon sx={{ color: "text" }} name="sidebar" />
            </Menu.Item>
          </Menu>
        </Container>
        <Body userId={userId} />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
