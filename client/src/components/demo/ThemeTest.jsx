/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { useState, useEffect } from "react";
import DemoPage from "./Demo";
import ThemeSelector from "../ThemeSelector";
import themes from "../themes";

export default () => {
  const [theme, setTheme] = useState("base");
  const [preset, setPreset] = useState(themes[theme]);

  useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]);
  return (
    <div
      style={{ width: "100%", maxWidth: "800px", display: "flex" }}
      sx={{
        "*": {
          transition: "all .2s ease-out",
        },
      }}
    >
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <ThemeProvider theme={preset}>
        <DemoPage theme={theme} />
      </ThemeProvider>
    </div>
  );
};
