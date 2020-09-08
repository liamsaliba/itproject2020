/** @jsx jsx */
import { jsx, Box, Container, Flex, Styled, ThemeProvider } from "theme-ui";
import Navbar from "./NavBar";
import { useState, useEffect } from "react";
import Demo from "../demo/Demo";
import themes from "../themes";
// import { Router } from "@reach/router";

const bodyStyling = {
  position: "absolute",
  // top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  justifyContent: "center",
};

export default props => {
  const { userId: id } = props;
  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);

  return (
    <ThemeProvider theme={preset}>
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
