/** @jsx jsx */
import { jsx, Flex, Container, ThemeProvider } from "theme-ui";
import User from "../User";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Title } from "./../../components/index";
import * as Sidebar from "./Sidebar";

import themes from "../../themes";
import { selectUsername } from "../../store";

export default props => {
  const id = useSelector(selectUsername);

  return (
    <Flex
      sx={{
        display: "flex",
        flexWrap: "wrap",
        height: "100vh",
        background: "white",
        color: "black",
      }}
    >
      <ThemeProvider theme={themes.base}>
        <Title>Editor: {id}</Title>
        <aside
          sx={{
            width: "250px",
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
