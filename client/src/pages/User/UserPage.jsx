/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components/index";

const UserPage = props => {
  const { userId } = props;

  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  const pages = ["Publications", "Experience", "Articles", "About"];

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);

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
          <Navbar
            userId={userId}
            theme={theme}
            setTheme={setTheme}
            pages={pages}
          />
        </header>

        <Body userId={userId} pages={pages} />
      </Flex>
    </ThemeProvider>
  );
};

export default UserPage;
