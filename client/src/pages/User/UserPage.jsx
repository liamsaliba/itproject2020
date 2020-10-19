/** @jsx jsx */
import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components/index";
import { selectPortfolioByUsername, selectPortfolioPages } from "../../store";
import { useSelector } from "react-redux";

import { Link } from "../../components/NavItems";
import { MenuItem, MenuCamel } from "../../components";

import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";

import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const UserPage = props => {
  const { userId } = props;
  const [preset, setPreset] = useState(themes["base"]);
  const [open, setOpen] = useState(false);
  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );
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

  useEffect(() => {
    setPreset(
      themes[
        ["default", "theme"].includes(portfolio.theme)
          ? "base"
          : portfolio.theme
      ]
    );
  }, [portfolio.theme]);

  return (
    <MediaContextProvider>
      <ThemeProvider theme={preset}>
        <Title>{userId}</Title>
        <Flex
          sx={{
            flexDirection: "column",
            minHeight: "100vh",
            bg: "background",
            color: "text",
          }}
        >
          <header>
            <Media greaterThan="mobile">
              <Navbar userId={userId} />
              <Body userId={userId} />
            </Media>
          </header>
          <Media at="mobile">
            <Sidebar.Pushable>
              <Sidebar
                as={Menu}
                animation="slide along"
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
          </Media>
        </Flex>
      </ThemeProvider>
    </MediaContextProvider>
  );
};

export default UserPage;
