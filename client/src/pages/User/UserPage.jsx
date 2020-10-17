/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components";
import { selectPortfolioTheme } from "../../store";
import { useSelector } from "react-redux";
import Hamburger from "../../components/Hamburger";

import { createMedia } from "@artsy/fresnel";
const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const UserPage = props => {
  const { userId } = props;
  const [preset, setPreset] = useState(themes["base"]);
  const theme = useSelector(state => selectPortfolioTheme(state, userId));

  useEffect(() => {
    setPreset(themes[["default", "theme"].includes(theme) ? "base" : theme]);
  }, [theme]);

  return (
    <MediaContextProvider>
      <ThemeProvider theme={preset}>
        <Title>{userId}</Title>
        <Flex
          sx={{
            flexDirection: "column",
            minHeight: "100vh",
            bg: "background",
            color: "text",
          }}
        >
          <header>
            <Media greaterThan="mobile">
              <Navbar userId={userId} />
              <Body userId={userId} />
            </Media>
          </header>
          <Media at="mobile">
            <Hamburger landing={false} userId={userId}>
              <Body userId={userId} />
            </Hamburger>
          </Media>
        </Flex>
      </ThemeProvider>
    </MediaContextProvider>
  );
};

export default UserPage;
