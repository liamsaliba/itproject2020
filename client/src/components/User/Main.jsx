/** @jsx jsx */
import { jsx, Image, Box, Container, Flex, Styled, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import profileExample from "../../svg/Profile_example.png";
import { useState, useEffect } from "react";
// import Demo from "../demo/Demo";
import themes from "../themes";
// import { Router } from "@reach/router";

const styling = {
  textAlign: "center",
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
          <Container sx = {styling} margin={5}>
            <Box>
              <Image src={profileExample} sx= {{borderRadius:"50%", width:"20%"}} margin={5}/>
              <Styled.h1> Bob Dylan </Styled.h1>
            </Box> 
          </Container>

          <Container sx = {styling} margin={5} >
            <Box>
              <Styled.h2> About </Styled.h2>
              <Styled.p> This is the about Container </Styled.p>
            </Box> 
          </Container>

          <Container sx = {styling} margin={5} >
            <Box>
              <Styled.h2> Projects </Styled.h2>
              <Styled.p> This is the Projects Container </Styled.p>
            </Box> 
          </Container>

          <Container sx = {styling} margin={5} >
            <Box>
              <Styled.h2> Publications </Styled.h2>
              <Styled.p> This is the Publications Container </Styled.p>
            </Box> 
          </Container>
          
          <Container sx = {styling} margin={5} >
            <Box>
              <Styled.h2> Contacts </Styled.h2>
              <Styled.p> This is the Contacts Container </Styled.p>
            </Box> 
          </Container>
        </main>
      </Flex>
    </ThemeProvider>
  );
};
