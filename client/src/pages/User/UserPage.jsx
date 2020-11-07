/** @jsx jsx */
import { jsx, Flex, ThemeProvider, Box } from "theme-ui";
import { UserNavbar, UserHamburger } from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components";
import { selectPortfolioTheme } from "../../store";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { selectPortfolioIsEditing } from "../../store/slices/portfolios";

import { createMedia } from "@artsy/fresnel";
import makeTheme from "../../themes/makeTheme";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
});

const UserPage = props => {
  const { userId, selectedPage } = props;
  const [preset, setPreset] = useState(themes["base"]);
  const theme = useSelector(state => selectPortfolioTheme(state, userId));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  useEffect(() => {
    setPreset(makeTheme(theme));
  }, [theme]);

  const MobileBody = (
    <UserHamburger userId={userId} editing={editing}>
      <Box sx={{ minHeight: "45em" }}>
        <Body userId={userId} selectedPage={selectedPage} />
      </Box>
      <Footer userId={userId} />
    </UserHamburger>
  );

  return (
    <MediaContextProvider>
      <ThemeProvider theme={preset}>
        <Title>{(editing ? "Editing " : "").concat(userId)}</Title>

        <Media greaterThan="tablet">
          <Flex
            sx={{
              flexDirection: "column",
              minHeight: "100vh",
              bg: "background",
              color: "text",
            }}
          >
            <UserNavbar userId={userId} editing={editing} />
            <Flex
              sx={{
                flex: "1",
                justifyContent: "center",
              }}
            >
              <Body userId={userId} selectedPage={selectedPage} />
            </Flex>
            <Footer userId={userId} />
          </Flex>
        </Media>
        <Media at="tablet">
          <Flex
            sx={{
              flexDirection: "column",
              minHeight: "100vh",
              bg: "background",
              color: "text",
            }}
          >
            {MobileBody}
          </Flex>
        </Media>
        <Media lessThan="tablet">
          <Flex
            sx={{
              flexDirection: "column",
              minHeight: "100vh",
              bg: "background",
              color: "text",
            }}
          >
            {MobileBody}
          </Flex>
        </Media>
      </ThemeProvider>
    </MediaContextProvider>
  );
};

export default UserPage;
