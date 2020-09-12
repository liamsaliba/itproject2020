/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { useState, useEffect } from "react";
import DemoPage from "./Demo";
import { ThemeSelector } from "../../components";
import themes from "../../themes";

export default () => {
  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);
  return (
    <ThemeProvider theme={preset}>
      <div
        style={{ width: "100%", maxWidth: "800px" }}
        sx={{
          backgroundColor: "background",
          color: "text",
          "*": {
            transition: "all .2s ease-out",
          },
        }}
      >
        Choose a theme:
        <ThemeSelector theme={theme} setTheme={setTheme} size={200} />
        <DemoPage theme={theme} />
      </div>
    </ThemeProvider>
  );
};
