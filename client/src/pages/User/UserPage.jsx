/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
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

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 768,
  },
});

const UserPage = props => {
  const { userId, selectedPage } = props;
  const [preset, setPreset] = useState(themes["base"]);
  const theme = useSelector(state => selectPortfolioTheme(state, userId));
  const editing = useSelector(state => selectPortfolioIsEditing(state, userId));

  useEffect(() => {
    setPreset(themes[["default", "theme"].includes(theme) ? "base" : theme]);
  }, [theme]);

  const MobileBody = (
    <UserHamburger userId={userId} editing={editing}>
      <Body userId={userId} selectedPage={selectedPage} />
      <Footer userId={userId} />
    </UserHamburger>
  );

  return (
    <MediaContextProvider>
      <ThemeProvider theme={preset}>
        <Title>{(editing ? "Editing " : "").concat(userId)}</Title>
        <Flex
          sx={{
            flexDirection: "column",
            minHeight: "100vh",
            bg: "background",
            color: "text",
          }}
        >
          <header>
            <Media greaterThan="tablet">
              <UserNavbar userId={userId} editing={editing} />
              <Body userId={userId} selectedPage={selectedPage} />
              <Footer userId={userId} />
            </Media>
          </header>
          <Media at="tablet">{MobileBody}</Media>
          <Media lessThan="tablet">{MobileBody}</Media>
        </Flex>
      </ThemeProvider>
    </MediaContextProvider>
  );
};

export default UserPage;
