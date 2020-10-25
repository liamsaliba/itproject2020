/** @jsx jsx */

import { MainNavbar, MainHamburger } from "./Navbar";
import Footer from "./Footer";
import { jsx, Flex, ThemeProvider } from "theme-ui";
import themes from "../../themes";
import { createMedia } from "@artsy/fresnel";

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
            <MainNavbar as="header" />
            <Flex variant="layout.centerflex">{props.children}</Flex>
            <Footer as="footer" />
          </Flex>
        </Media>
        <Media at="mobile">
          <Flex sx={flexProps}>
            <MainHamburger>
              {props.children}
              <Footer as="footer" sx={{ mt: "3em" }} />
            </MainHamburger>
          </Flex>
        </Media>
      </ThemeProvider>
    </MediaContextProvider>
  );
};
