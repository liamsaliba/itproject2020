import React from "react";

import { ProfileDropdown, Navbar, MenuCamel } from "../../components";
import { useSelector } from "react-redux";
import { selectToken } from "../../store";

export default props => {
  const token = useSelector(selectToken);
  const { userId: id, pages } = props;

  const menuItems = pages.map(name => (
    <Navbar.Item key={name} to={`#${name}`}>
      {name}
    </Navbar.Item>
  ));

  return (
    <Navbar>
      <Navbar.Left>
        <MenuCamel />
        <Navbar.Item to="#">{id}</Navbar.Item>
      </Navbar.Left>
      <Navbar.Center size="4">{menuItems}</Navbar.Center>
      <Navbar.Right size="1">
        {token && <ProfileDropdown items="default" />}
      </Navbar.Right>
    </Navbar>
  );
};
