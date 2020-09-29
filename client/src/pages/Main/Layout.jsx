/** @jsx jsx */

import Navbar from "./Navbar";
import Footer from "./Footer";
import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
import themes from "../../themes";

export default props => {
  const theme = themes.custom;

  return (
    <ThemeProvider theme={theme}>
      <Flex
        sx={{
          flexDirection: "column",
          // ensure the screen is always filled (footer isn't floating)
          minHeight: "100vh",
        }}
      >
        <Navbar as="header" />
        <Flex
          variant="layout.centerflex"
          sx={{
            backgroundImage: "url('https://i.redd.it/jpx7gtsw5ye41.jpg')",
          }}
        >
          <Box p={5} sx={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
            {props.children}
          </Box>
        </Flex>
        <Footer as="footer" />
      </Flex>
    </ThemeProvider>
  );
};
