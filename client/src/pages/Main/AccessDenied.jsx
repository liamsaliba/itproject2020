import React from "react";
import { Styled, Box } from "theme-ui";
import { Header, Icon } from "semantic-ui-react";
import { MenuButton } from "../../components";

export default () => {
  return (
    <Box sx={{ p: "1em" }}>
      <Header as="h2">
        <Icon name="remove" />
        <Header.Content>Editor disabled</Header.Content>
      </Header>
      <Styled.p>
        Your viewer is too narrow for us to give you a good editing experience.
        We recommend opening the editor on a larger device for now.
      </Styled.p>
      <MenuButton to={`/`}>
        <Icon name="home" />
        Home
      </MenuButton>
    </Box>
  );
};
