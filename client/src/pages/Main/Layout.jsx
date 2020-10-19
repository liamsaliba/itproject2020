/** @jsx jsx */

import Navbar from "./Navbar";
import Footer from "./Footer";
import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
import themes from "../../themes";
import { createMedia } from "@artsy/fresnel";
import Mobile from "./Mobile";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

export const Whitebox = props => (
  <Box p={5} sx={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
    {props.children}
  </Box>
);

export default props => {
  const theme = themes.custom;

  const Body = () => (
    <Flex variant="layout.centerflex">
      <Whitebox children={props.children} />
    </Flex>
  );

  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <Flex
          sx={{
            flexDirection: "column",
            // ensure the screen is always filled (footer isn't floating)
            minHeight: "100vh",
          }}
        >
          <Media greaterThan="mobile">
            <Navbar as="header" />
            <Body />
          </Media>
          <Media at="mobile">
            <Mobile body={<Body />} />
          </Media>
          <Footer as="footer" />
        </Flex>
      </ThemeProvider>
    </MediaContextProvider>
  );
};
