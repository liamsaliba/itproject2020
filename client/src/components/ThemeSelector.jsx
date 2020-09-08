/** @jsx jsx */
import { jsx, Box, Select } from "theme-ui";

import themes from "./themes";

export default function ThemeSelector({ theme, setTheme, sx = {} }) {
  return (
    <Box sx={sx}>
      {/* <label
        htmlFor="theme"
        sx={{
          display: "block",
          mb: 4,
        }}
      >
        Preset: */}
      <Select id="theme" value={theme} onChange={e => setTheme(e.target.value)}>
        {Object.keys(themes).map(key => (
          <option key={key} children={key} />
        ))}
      </Select>
      {/* </label> */}
    </Box>
  );
}
