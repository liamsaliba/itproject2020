/** @jsx jsx */
import { jsx } from "theme-ui";
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
  selectUser,
  selectNumArtifactsByPageId,
  selectCurrentUserPortfolio,
} from "../../store";
import { Icon, Menu } from "semantic-ui-react";
import { isTrue } from "../../helpers";

export const UserHamburger = props => {
  const { userId, editing, children } = props;
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const allowContact = useSelector(
    state => selectCurrentUserPortfolio(state).allowContact
  );
  const useSinglePages = useSelector(
    state => selectCurrentUserPortfolio(state).singlePages
  );
  const pages = useSelector(state => selectPortfolioPages(state, userId));
  // I know it's hard coded, w/e
  const path = editing ? "/editor" : `/u/${userId}`;
  const getPath = name =>
    useSinglePages ? `${path}/#${name}` : `${path}/${name}`;

  const menuProps = {
    activeClassName: "nactive",
    onClick: close,
    sx: {
      variant: "links.nav",
    },
    smooth: true, // smooth scroll to element
    p: 2,
    as: Link,
  };

  const sidebarItems = pages.map(page => (
    <Menu.Item key={page.pageId} to={getPath(page.name)} {...menuProps}>
      {page.name}
    </Menu.Item>
  ));

  const portfolioMenu = (
    <Menu.Item>
      <Menu.Header style={{ fontSize: "2em", fontWeight: "bold" }}>
        {userId}
      </Menu.Header>
      <Menu.Menu style={{ fontSize: "1.5em" }}>
        {sidebarItems}
        {allowContact ? (
          <Menu.Item to={path + "/contact"} {...menuProps} />
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

  const allowContact = useSelector(
    state => selectCurrentUserPortfolio(state).allowContact
  );
  const useSinglePages = useSelector(
    state => selectCurrentUserPortfolio(state).singlePages
  );
  const pages = useSelector(state => selectPortfolioPages(state, userId));
  // I know it's hard coded, w/e
  const path = editing ? "/editor" : `/u/${userId}`;
  const getPath = name =>
    useSinglePages ? `${path}/#${name}` : `${path}/${name}`;

  const NavItem = ({ page }) => {
    const numPages = useSelector(state =>
      selectNumArtifactsByPageId(state, page.pageId)
    );

    return (
      <Navbar.Item
        key={page.pageId}
        to={getPath(page.name)}
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
    <Navbar>
      <Navbar.Left>
        <MenuCamel />
      </Navbar.Left>
      <Navbar.Center>
        <Navbar.Item to={path}>{userId}</Navbar.Item>
        <span sx={{ p: "0.4em" }}>|</span>
        {menuItems}
        {isTrue(allowContact) ? (
          <React.Fragment>
            <span sx={{ p: "0.4em" }}>|</span>
            <Navbar.Item key="nav-contact" to={path + "/contact"}>
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
  );
};

export default UserNavbar;
