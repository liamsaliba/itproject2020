/** @jsx jsx */
import { jsx, Flex, ThemeProvider } from "theme-ui";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import themes from "../../themes";
import Body from "./Body";
import { Title } from "./../../components/index";
import { useParams } from "react-router-dom";

export const RouteUser = () => {
  const { userId } = useParams();
  return <User userId={userId} />;
};

const User = props => {
  const id = props.userId;
  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  const pages = ["Publications", "Experience", "Articles", "About"];

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);

  return (
    <ThemeProvider theme={preset}>
      <Title>{id}</Title>

      <Flex
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
          bg: "background",
          color: "text",
        }}
      >
        <header>
          <Navbar userId={id} theme={theme} setTheme={setTheme} pages={pages} />
        </header>

        <Body userId={id} pages={pages} />
      </Flex>
    </ThemeProvider>
  );
};

export default User;
