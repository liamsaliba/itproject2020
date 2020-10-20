/** @jsx jsx */

import Navbar from "./Navbar";
import Footer from "./Footer";
import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
import themes from "../../themes";
import { createMedia } from "@artsy/fresnel";
import Hamburger from "../../components/Hamburger";

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

  const flexProps = {
    flexDirection: "column",
    // ensure the screen is always filled (footer isn't floating)
    minHeight: "100vh",
  };

  return (
    <MediaContextProvider>
      <ThemeProvider theme={theme}>
        <Media greaterThan="mobile">
          <Flex sx={flexProps}>
            <Navbar as="header" />
            <Body />
            <Footer as="footer" />
          </Flex>
        </Media>
        <Media at="mobile">
          <Flex sx={flexProps}>
            <Hamburger landing={true}>
              <Body />
              <Footer as="footer" />
            </Hamburger>
          </Flex>
        </Media>
      </ThemeProvider>
    </MediaContextProvider>
  );
};
