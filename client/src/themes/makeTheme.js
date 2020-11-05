import { merge } from "theme-ui";
import themes from "./";

const defaultBase = "base";

const makeTheme = (theme, oldTheme) => {
  const { base, colours, fonts } = theme;
  const newStuff = {
    colors: colours,
    fonts,
  };

  if (oldTheme) {
    return merge(oldTheme, newStuff);
  }

  const preset = ["default", "theme"].includes(base)
    ? themes[defaultBase]
    : themes[base] || {};

  if (colours === {} && fonts === {}) return preset;
  return merge(preset, newStuff);
};

export default makeTheme;
