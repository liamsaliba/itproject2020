import material from "@rebass/preset-material";
import def from "./default.theme";
import { objectMap } from "../helpers";
// import { merge } from "theme-ui";

import * as presets from "@theme-ui/presets";

const allPresets = {
  def,
  ...presets,
  material,
};

delete allPresets["tailwind"];

const safePresets = objectMap(allPresets, preset => {
  if (preset.colors) {
    // use a subset of the allowed colours
    const { text, background, primary, secondary, muted } = preset.colors;
    preset.colors = { text, background, primary, secondary, muted };
  }
  return preset;
});

export default {
  ...safePresets,
};
