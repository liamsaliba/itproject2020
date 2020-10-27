import React from "react";
import { Styled, Box } from "theme-ui";
import { Header, Icon } from "semantic-ui-react";
import { MenuButton } from "../../components";

// TODO: Styles

export default () => {
  return (
    <Box>
      <Header as="h2">
        <Icon name="question circle" />
        <Header.Content>404 Not found</Header.Content>
      </Header>
      <Styled.p>Have you lost your way?</Styled.p>
      <MenuButton to={`/`}>
        <Icon name="home" />
        Home
      </MenuButton>
    </Box>
  );
};
