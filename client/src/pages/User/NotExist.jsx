/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

import MainLayout from "../Main/Layout";
import { MenuButton } from "../../components";
import { Header, Icon } from "semantic-ui-react";

export const NotExist = ({ userId }) => (
  <Box>
    <Header as="h2">
      <Icon name="question circle" />
      <Header.Content>Portfolio not found</Header.Content>
    </Header>
    <Styled.p>
      Looks like <b>{userId}</b> doesn't have a portfolio yet.
    </Styled.p>
    <Styled.p>Would you like to sign up and create a new one?</Styled.p>
    <MenuButton to={`/signup/${userId}`}>Sign up</MenuButton>
  </Box>
);

export default ({ userId }) => {
  return (
    <MainLayout>
      <NotExist userId={userId} />
    </MainLayout>
  );
};
