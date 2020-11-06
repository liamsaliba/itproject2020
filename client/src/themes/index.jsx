import rebassMaterial from "@rebass/preset-material";
import custom from "./Main.theme";
import def from "./default.theme";
import funked from "./Funked.theme";
import { objectMap } from "../helpers";
// import { merge } from "theme-ui";

import * as presets from "@theme-ui/presets";

const allPresets = {
  rebassMaterial,
  funked,
  custom,
  def,
  ...presets,
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
