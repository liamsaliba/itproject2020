/** @jsx jsx */
import { jsx } from "theme-ui";
import { ProfileDropdown, MenuItem, Navbar, MenuCamel } from "../../components";
import { useSelector } from "react-redux";
import React from "react";
import {
  selectPortfolioPages,
  selectToken,
  selectUsername,
  selectPortfolioIsEditing,
  selectUser,
  selectNumArtifactsByPageId,
} from "../../store";
import { Icon } from "semantic-ui-react";
import { isTrue } from "../../helpers";

export default props => {
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const allowContact = useSelector(state => selectUser(state).allowContact);
  const useSinglePages = useSelector(state => selectUser(state).allowContact);
  const editing = useSelector(state =>
    selectPortfolioIsEditing(state, username)
  );
  const { userId } = props;
  const pages = useSelector(state => selectPortfolioPages(state, userId));
  // I know it's hard coded, w/e
  const path = editing ? "/editor" : `/u/${userId}`;

  const NavItem = ({ page }) => {
    const numPages = useSelector(state =>
      selectNumArtifactsByPageId(state, page.pageId)
    );

    const thisPath = useSinglePages
      ? `${path}/#${page.name}`
      : `${path}/${page.name}`;

    return (
      <Navbar.Item
        key={page.pageId}
        to={thisPath}
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
