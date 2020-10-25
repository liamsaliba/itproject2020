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
} from "../../store";
import { Icon } from "semantic-ui-react";

const NavItem = ({ page }) => (
  <Navbar.Item key={page.pageId} to={`#${page.name}`}>
    {page.name}
  </Navbar.Item>
);

export default props => {
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);
  const editing = useSelector(state =>
    selectPortfolioIsEditing(state, username)
  );
  const { userId } = props;
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const menuItems =
    pages.length > 10
      ? pages
          .slice(0, 10)
          .map(page => <NavItem key={page.pageId.toString()} page={page} />)
          .concat([<Navbar.Item>...</Navbar.Item>])
      : pages.map(page => <NavItem key={page.pageId.toString()} page={page} />);

  return (
    <Navbar>
      <Navbar.Left>
        <MenuCamel />
      </Navbar.Left>
      <Navbar.Center>
        <Navbar.Item to="#">{userId}</Navbar.Item>
        <span sx={{ p: "0.4em" }}>|</span>
        {menuItems}
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
