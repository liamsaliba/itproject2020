import React from "react";

import { ProfileDropdown, Navbar, MenuCamel } from "../../components";
import { useSelector } from "react-redux";
import { selectPortfolioPages, selectToken } from "../../store";

const NavItem = ({ page }) => (
  <Navbar.Item key={page.pageId} to={`#${page.name}`}>
    {page.name}
  </Navbar.Item>
);

export default props => {
  const token = useSelector(selectToken);
  const { userId } = props;
  const pages = useSelector(state => selectPortfolioPages(state, userId));

  const menuItems =
    pages.length > 10
      ? pages
          .slice(0, 10)
          .map(page => <NavItem page={page} />)
          .concat([<Navbar.Item>...</Navbar.Item>])
      : pages.map(page => <NavItem page={page} />);

  return (
    <Navbar>
      <Navbar.Left>
        <MenuCamel />
        <Navbar.Item to="#">{userId}</Navbar.Item>
      </Navbar.Left>
      <Navbar.Center size="4">{menuItems}</Navbar.Center>
      <Navbar.Right size="1">
        {token && <ProfileDropdown items="default" />}
      </Navbar.Right>
    </Navbar>
  );
};
