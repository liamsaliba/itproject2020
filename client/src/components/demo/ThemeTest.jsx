/** @jsx jsx */
import { jsx, Select, Container } from "theme-ui";
import { useState } from "react";
import themes from "../themes";
import DemoPage from "./Demo";

export default () => {
  const [theme, setTheme] = useState("base");
  console.log(themes);
  return (
    <div
      style={{ width: "100%", maxWidth: "800px", display: "flex" }}
      sx={{
        "*": {
          transition: "all .2s ease-out",
        },
      }}
    >
      <Container sx={{ p: 30 }}>
        <label
          htmlFor="theme"
          sx={{
            display: "block",
            mb: 4,
          }}
        >
          Preset:
          <Select
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          >
            {Object.keys(themes).map(key => (
              <option key={key} children={key} />
            ))}
          </Select>
        </label>
        <DemoPage theme={theme} />
      </Container>
    </div>
  );
};
