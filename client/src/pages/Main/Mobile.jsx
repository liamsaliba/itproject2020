/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MenuCamel } from "../../components";
import { Link } from "../../components/NavItems";
import { Menu, Sidebar, Container, Icon } from "semantic-ui-react";

export default props => {
  const auth = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);

  // const sidebarItems = pages.map(page => (
  //   <Menu.Item
  //     key={page.pageId}
  //     link
  //     to={`/${page.name}`}
  //     as={Link}
  //     activeClassName="nactive"
  //     onClick={() => setOpen(false)}
  //     sx={{
  //       variant: "links.nav",
  //     }}
  //     p={2}
  //   >

  //   </Menu.Item>
  // ));

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
            <Menu.Item as={Link} to="/" onClick={() => setOpen(false)}>
              Camel Case
            </Menu.Item>
            <Box mx="auto" />
          </Flex>
        </Menu.Item>
        <Menu.Item as={Link} to="themes" onClick={() => setOpen(false)}>
          Themes
        </Menu.Item>

        {/* {auth.token && <ProfileDropdown items="default" />} */}

        {!auth.token && (
          <React.Fragment>
            <Menu.Item as={Link} to="login" onClick={() => setOpen(false)}>
              Login
            </Menu.Item>
            <Menu.Item as={Link} to="signup" onClick={() => setOpen(false)}>
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
        {/* <Flex variant="layout.centerflex">
          <Whitebox children={props.children} />
        </Flex> */}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};
