/** @jsx jsx */
import { jsx, Container, Flex, Styled, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
// import { Router } from "@reach/router";
import { Title } from "./../../components/index";

export default props => {
  const { userId: id } = props;
  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);

  return (
    <ThemeProvider theme={preset}>
      <Title>{id}</Title>

      <Flex
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <header>
          <Navbar userId={id} theme={theme} setTheme={setTheme} />
        </header>

        <main>
          <Container>
            {/* <Box sx={bodyStyling}> */}
            <Styled.h1> Hi There </Styled.h1>
            <Styled.p>this is the userpage of user {id}.</Styled.p>
            {/* </Box> */}
          </Container>
        </main>
      </Flex>
    </ThemeProvider>
  );
};
