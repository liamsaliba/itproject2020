/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components/index";
import { selectPortfolioByUsername } from "../../store";
import { useSelector } from "react-redux";

const UserPage = props => {
  const { userId } = props;
  const [preset, setPreset] = useState(themes["base"]);
  const portfolio = useSelector(state =>
    selectPortfolioByUsername(state, userId)
  );

  const pages = ["Publications", "Experience", "Articles", "About"];

  useEffect(() => {
    setPreset(themes[portfolio.theme === "default" ? "base" : portfolio.theme]);
  }, [portfolio.theme]);

  return (
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
          <Navbar userId={userId} pages={pages} />
        </header>

        <Body userId={userId} pages={pages} />
      </Flex>
    </ThemeProvider>
  );
};

export default UserPage;
