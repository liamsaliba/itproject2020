/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import { MenuSemanticButton, CenterFlex } from "../../components";
import { Header, Icon } from "semantic-ui-react";
import { Flex } from "theme-ui";

export const NotExist = ({ userId }) => (
  <CenterFlex sx={{ minHeight: "100vh" }}>
    <Header as="h2">
      <Icon name="question circle" />
      <Header.Content>Portfolio not found</Header.Content>
    </Header>
    <Styled.p>
      Looks like <b>{userId}</b> doesn't have a portfolio yet.
    </Styled.p>
    <Styled.p>Would you like to sign up and create a new one?</Styled.p>
    <Flex sx={{ flexDirection: "row" }}>
      <MenuSemanticButton primary to={`/signup/${userId}`}>
        <Icon name="user plus" />
        Sign up
      </MenuSemanticButton>
      <MenuSemanticButton to={`/`}>
        <Icon name="home" />
        Home
      </MenuSemanticButton>
    </Flex>
  </CenterFlex>
);

export default ({ userId }) => {
  return <NotExist userId={userId} />;
};
