/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

import MainLayout from "../Main/Layout";
import { MenuButton } from "../../components";
import { Header, Icon } from "semantic-ui-react";

export default ({ userId }) => {
  return (
    <MainLayout>
      <Box>
        <Header as="h2">
          <Icon name="question circle" />
          <Header.Content>Portfolio not found</Header.Content>
        </Header>
        <Styled.p>
          Looks like <b>{userId}</b> doesn't have a portfolio yet. Would you
          like to sign up and create a new one?
        </Styled.p>
        <MenuButton to={`/signup/${userId}`}>Sign up</MenuButton>
      </Box>
    </MainLayout>
  );
};
