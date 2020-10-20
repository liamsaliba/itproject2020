/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, SidebarCamel } from "./NavItems";
import { ProfileIcon } from "./ProfileIcon";
import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";
import { selectPortfolioPages, selectToken, selectUser } from "../store";

export default props => {
  const { landing, body, userId } = props;
  const [open, setOpen] = useState(false);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const sidebarItems = landing
    ? null
    : pages.map(page => (
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

  const userMenu = (
    <Menu.Item>
      <Menu.Header
        style={{ fontSize: "1.5em", fontWeight: "bold", marginTop: "3em" }}
      >
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
  );

  const loginMenu = (
    <React.Fragment>
      <Menu.Item
        style={{ fontSize: "1.5em", marginTop: "3em" }}
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
  );

  const themesMenu = (
    <Menu.Item
      style={{ fontSize: "1.5em" }}
      as={Link}
      to="themes"
      onClick={() => setOpen(false)}
    >
      <Icon name="paint brush" />
      Themes
    </Menu.Item>
  );

  const portfolioMenu = (
    <Menu.Item>
      <Menu.Header style={{ fontSize: "2em", fontWeight: "bold" }}>
        {userId}
      </Menu.Header>
      <Menu.Menu style={{ fontSize: "1.5em" }}>{sidebarItems}</Menu.Menu>
    </Menu.Item>
  );

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
          style={{ fontSize: "1.8em", fontWeight: "bold" }}
          as={Link}
          to="/"
          onClick={() => setOpen(false)}
        >
          <Flex sx={{ alignItems: "center" }}>
            <SidebarCamel />
            Camel Pages
            <Box mx="auto" />
          </Flex>
        </Menu.Item>
        {landing ? themesMenu : portfolioMenu}
        {token ? userMenu : loginMenu}
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <Container>
          <Menu secondary size="large">
            <Menu.Item onClick={setOpen}>
              <Icon
                size="large"
                floated="left"
                sx={{ color: "text" }}
                name="sidebar"
              />
            </Menu.Item>
          </Menu>
        </Container>

        {body}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
