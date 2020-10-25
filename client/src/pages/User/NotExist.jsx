/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

import { MenuButton, CenterFlex } from "../../components";
import { Header, Icon } from "semantic-ui-react";
import { Flex } from "theme-ui";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store";

export const NotExist = ({ userId }) => {
  const username = useSelector(selectUsername);
  return (
    <CenterFlex sx={{ minHeight: "100vh" }}>
      <Header as="h2">
        <Icon name="question circle" />
        <Header.Content>Portfolio not found</Header.Content>
      </Header>
      <Styled.p>
        Looks like <b>{userId}</b> doesn't have a portfolio yet.
      </Styled.p>
      {!username ? (
        <Styled.p>Would you like to sign up and create a new one?</Styled.p>
      ) : null}
      <Flex sx={{ flexDirection: "row" }}>
        {!username ? (
          <MenuButton primary to={`/signup/${userId}`}>
            <Icon name="user plus" />
            Sign up
          </MenuButton>
        ) : null}
        <MenuButton to={`/`}>
          <Icon name="home" />
          Home
        </MenuButton>
      </Flex>
    </CenterFlex>
  );
};

export default ({ userId }) => {
  return <NotExist userId={userId} />;
};
