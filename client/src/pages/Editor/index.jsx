/** @jsx jsx */
import { jsx, Styled, Flex, Container, ThemeProvider } from "theme-ui";
import User from "../User";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Title } from "./../../components/index";
import * as Sidebar from "./Sidebar";

import themes from "../../themes";

export default props => {
  const theme = themes.custom;
  let { userId: id } = props;

  const auth = useSelector(state => state.auth);
  id = auth.user.username;

  return (
    <Flex
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Title>Editor: {id}</Title>
        <aside
          sx={{
            width: "sidebar",
            borderRight: "1px black solid",
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          {/* <Sidebar/> */}
          <Navbar userId={id} />
          <Container
            sx={{
              overflow: "auto",
            }}
          >
            <Styled.p>This is the editor page of user {id}.</Styled.p>
            <Sidebar.Sections />
          </Container>
        </aside>
      </ThemeProvider>
      <main
        sx={{
          flexGrow: 99999,
          flexBasis: 0,
          minWidth: 320,
          overflowY: "auto",
          overflowX: "hidden",

          height: "100%",
        }}
      >
        <User userId={id} />
      </main>
    </Flex>
  );
};
