import { merge } from "theme-ui";
import themes from "./";

const makeTheme = theme => {
  const { base, colours, fonts } = theme;

  const preset = themes[base] || {};

  return merge(preset, {
    colors: colours,
    fonts,
  });
};

export default makeTheme;
