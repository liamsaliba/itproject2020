import React from "react";

import {
  ProfileIcon,
  ThemeSelector,
  Navbar,
  MenuCamel,
} from "../../components";

export default props => {
  const { userId: id, theme, setTheme, pages } = props;

  const menuItems = pages.map(name => (
    <Navbar.Item key={name} to={`#${name}`}>
      {name}
    </Navbar.Item>
  ));

  return (
    <Navbar>
      <Navbar.Left>
        <MenuCamel />
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </Navbar.Left>
      <Navbar.Center size="4">{menuItems}</Navbar.Center>
      <Navbar.Right size="1">
        <ProfileIcon userId={id} to="#" />
      </Navbar.Right>
    </Navbar>
  );
};
