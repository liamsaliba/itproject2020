/** @jsx jsx */
import { Box, jsx, Styled } from "theme-ui";
import {
  ProfileDropdown,
  MenuItem,
  Navbar,
  MenuCamel,
  Hamburger,
  Link,
} from "../../components";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import {
  selectPortfolioPages,
  selectToken,
  selectUsername,
  selectNumArtifactsByPageId,
  selectPortfolioByUsername,
  selectFullName,
} from "../../store";
import { Icon, Menu, Sticky } from "semantic-ui-react";
import { isTrue, usePath } from "../../helpers";
import { transparentize } from "@theme-ui/color";

export const UserHamburger = props => {
  const { userId, children } = props;
  const [open, setOpen] = useState(false);
  const path = usePath(userId);

  const close = () => setOpen(false);

  const fullName = useSelector(state => selectFullName(state, userId));

  const allowContact = useSelector(
    state => selectPortfolioByUsername(state, userId).allowContact
  );

  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const menuProps = {
    activeClassName: "nactive",
    onClick: close,
    // sx: {
    //   variant: "links.nav",
    // },
    smooth: true, // smooth scroll to element
    p: 2,
    as: Link,
  };

  const sidebarItems = pages.map(page => (
    <Menu.Item key={page.pageId} to={path(page.name)} {...menuProps}>
      {page.name}
    </Menu.Item>
  ));

  const portfolioMenu = (
    <Menu.Item>
      <Menu.Header
        to={path()}
        size="huge"
        {...menuProps}
        // style={{ fontSize: "2em", fontWeight: "bold" }}
      >
        {/* <Styled.h2 sx={{ m: 0, color: "background", fontFamily: "monospace" }}>
          {userId}
        </Styled.h2> */}
        <Styled.h3 sx={{ m: 0 }}>{fullName}</Styled.h3>
      </Menu.Header>
      <Menu.Menu style={{ fontSize: "1.5em" }}>
        {sidebarItems}
        {isTrue(allowContact) ? (
          <Menu.Item to={path("contact")} {...menuProps}>
            Contact
          </Menu.Item>
        ) : null}
      </Menu.Menu>
    </Menu.Item>
  );

  return (
    <Hamburger
      close={close}
      open={() => setOpen(true)}
      isOpen={open}
      userId={userId}
      menu={portfolioMenu}
    >
      {children}
    </Hamburger>
  );
};

export const UserNavbar = props => {
  const { userId, editing } = props;
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const path = usePath(userId);

  const allowContact = useSelector(
    state => selectPortfolioByUsername(state, userId).allowContact
  );
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const NavItem = ({ page }) => {
    const numPages = useSelector(state =>
      selectNumArtifactsByPageId(state, page.pageId)
    );

    return (
      <Navbar.Item
        key={page.pageId}
        to={path(page.name)}
        important={editing && numPages === 0}
      >
        {page.name}
      </Navbar.Item>
    );
  };

  // TODO: do something clever about menu when too many items
  const menuItems =
    pages.length > 10
      ? pages
          .slice(0, 10)
          .map(page => (
            <NavItem key={"nav-" + page.pageId.toString()} page={page} />
          ))
          .concat([<Navbar.Item>...</Navbar.Item>])
      : pages.map(page => (
          <NavItem key={"nav-" + page.pageId.toString()} page={page} />
        ));

  return (
    <Sticky>
      <Box
        sx={{
          bg: transparentize("background", 0.2),
        }}
      >
        <Navbar>
          <Navbar.Left>
            <MenuCamel />
          </Navbar.Left>
          <Navbar.Center>
            <Navbar.Item to={path()}>{userId}</Navbar.Item>
            <span sx={{ p: "0.4em" }}>|</span>
            {menuItems}
            {isTrue(allowContact) ? (
              <React.Fragment>
                <span sx={{ p: "0.4em" }}>|</span>
                <Navbar.Item key="nav-contact" to={path("contact")}>
                  Contact
                </Navbar.Item>
              </React.Fragment>
            ) : null}
          </Navbar.Center>
          <Navbar.Right>
            {token && (
              <React.Fragment>
                {username === userId && !editing && (
                  <MenuItem style={{ fontSize: "1.2em" }} to="/editor">
                    <Icon name="edit" />
                    Edit
                  </MenuItem>
                )}
                <ProfileDropdown items="default" />
              </React.Fragment>
            )}
          </Navbar.Right>
        </Navbar>
      </Box>
    </Sticky>
  );
};

export default UserNavbar;
