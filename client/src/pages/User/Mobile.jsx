/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import { useState } from "react";
import Body from "./Body";
import { selectPortfolioPages } from "../../store";
import { useSelector } from "react-redux";
import { Link } from "../../components/NavItems";
import { MenuItem, MenuCamel } from "../../components";
import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";

export default props => {
  const { userId } = props;
  const [open, setOpen] = useState(false);
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
      >
        <Menu.Item>
          <Flex sx={{ alignItems: "center" }}>
            <MenuCamel />
            <MenuItem to="/">Camel Case</MenuItem>
            <Box mx="auto" />
          </Flex>
        </Menu.Item>
        {sidebarItems}
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <Container>
          <Menu inverted pointing secondary size="large">
            <Menu.Item onClick={setOpen}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Menu>
        </Container>
        <Body userId={userId} />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
