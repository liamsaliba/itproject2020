/** @jsx jsx */

import Navbar from "./Navbar";
import Footer from "./Footer";
import { jsx, Flex, ThemeProvider } from "theme-ui";
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

export default props => {
  const theme = themes.custom;

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
            <Flex variant="layout.centerflex">{props.children}</Flex>
            <Footer as="footer" />
          </Flex>
        </Media>
        <Media at="mobile">
          <Flex sx={flexProps}>
            <Hamburger landing={true}>
              {props.children}
              <Footer as="footer" />
            </Hamburger>
          </Flex>
        </Media>
      </ThemeProvider>
    </MediaContextProvider>
  );
};
