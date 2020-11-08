/** @jsx jsx */
import { jsx, Styled, Box } from "theme-ui";
import { Header, Icon } from "semantic-ui-react";
import { MenuButton } from "../../components";

export default () => {
  return (
    <Box sx={{ p: "1em", color: "white" }}>
      <Header inverted as="h2">
        <Icon name="remove" />
        <Header.Content>Editor disabled</Header.Content>
      </Header>
      <Styled.p sx={{ color: "white", fontFamily: "sans-serif" }}>
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
