/** @jsx jsx */
import { jsx, Box, Select } from "theme-ui";

import themes from "../themes";

export default function ThemeSelector({ theme, setTheme, size = 100 }) {
  return (
    <Box sx={{ display: "inline-block", m: 2 }}>
      {/* <label
        htmlFor="theme"
        sx={{
          display: "block",
          mb: 4,
        }}
      >
        Preset: */}
      <Select
        id="theme"
        value={theme}
        onChange={e => setTheme(e.target.value)}
        sx={{ width: size }}
      >
        {Object.keys(themes).map(key => (
          <option key={key} children={key} />
        ))}
      </Select>
      {/* </label> */}
    </Box>
  );
}
