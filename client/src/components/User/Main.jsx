/** @jsx jsx */
import { jsx, Image, Box, Container, Flex, Styled, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import profileExample from "../../svg/Profile_example.png";
import { useState, useEffect } from "react";
// import Demo from "../demo/Demo";
import themes from "../themes";
// import { Router } from "@reach/router";

/* const bodyStyling = {
  position: "absolute",
  // top: "10%",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  justifyContent: "center",
}; */

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
          <Container sx ={{display:"flex", justifyContent:"center", alignText:"center"}} margin={3} >
            <Box>
              <Image src={profileExample} sx= {{borderRadius:"50%", width:"35%"}}/>
              <Styled.h1> Bob Dylan </Styled.h1>
            </Box> 
          </Container>
            <Box>
              <Styled.h2> About </Styled.h2>
              <Styled.p>this is the userpage of user {id}.</Styled.p>
            </Box> 
            <Box>
              <Styled.h1> Project </Styled.h1>
              <Styled.p>this is the userpage of user {id}.</Styled.p>
            </Box> 
            <Box>
              <Styled.h1> Publication </Styled.h1>
              <Styled.p>this is the userpage of user {id}.</Styled.p>
            </Box> 
            <Box>
              <Styled.h2> Contacts </Styled.h2>
              <Styled.p>this is the userpage of user {id}.</Styled.p>
            </Box> 
          </Container>
        </main>
      </Flex>
    </ThemeProvider>
  );
};
