import React from "react";

import camel from "../../svg/camel.svg";

import { Profile, ThemeSelector, Navbar, MenuImage } from "../../components";

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
        <Navbar.Image src={camel} to="/" />
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </Navbar.Left>
      <Navbar.Center size="4">{menuItems}</Navbar.Center>
      <Navbar.Right size="1">
        <Profile userId={id} to="#" />
      </Navbar.Right>
    </Navbar>
  );
};
