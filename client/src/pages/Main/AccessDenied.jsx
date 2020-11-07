import React from "react";
import { Styled, Box } from "theme-ui";
import { Header, Icon } from "semantic-ui-react";
import { MenuButton } from "../../components";

// TODO: Styles

export default () => {
  return (
    <Box>
      <Header as="h2">
        <Icon name="remove" />
        <Header.Content>Access Denied</Header.Content>
      </Header>
      <Styled.p>Mobile editing is not allowed</Styled.p>
      <MenuButton to={`/`}>
        <Icon name="home" />
        Home
      </MenuButton>
    </Box>
  );
};
