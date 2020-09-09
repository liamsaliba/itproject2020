// Based on https://github.com/system-ui/theme-ui/blob/537d64a54dc77356efe2a0c23e46f78dc932e3e9/packages/preset-bootstrap/src/index.js
// Preset Bootstrap
import { base as themeBase } from "@theme-ui/presets";
import { theme as chakra } from "@chakra-ui/core";
import { custom } from "./Base.theme";

export const baseColors = {
  ...chakra.colors,
};

export const main = {
  ...themeBase,
  ...chakra,
  ...custom,
  baseColors,
  colors: {
    ...chakra.colors,
    grayDark: baseColors.gray[8],
    text: baseColors.gray[9],
    background: baseColors.white,
    primary: baseColors.purple[0],
    secondary: baseColors.gray[6],
    muted: baseColors.gray[3],
    success: baseColors.green,
    info: baseColors.cyan,
    warning: baseColors.yellow,
    danger: baseColors.red,
    light: baseColors.gray[1],
    dark: baseColors.gray[8],
    textMuted: baseColors.gray[6],
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#0cf",
        secondary: "#09c",
        muted: "#111",
      },
      papaya: {
        // this color mode will fallback to the root color object
        // for values not defined here
        text: "#433",
        background: "papayawhip",
      },
    },
  },
};

export default main;
