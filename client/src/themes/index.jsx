import rebassMaterial from "@rebass/preset-material";
import custom from "./Main.theme";
import baseChakra from "./BaseChakra.theme";

import funked from "./Funked.theme";
import { theme as chakra } from "@chakra-ui/core";

import * as presets from "@theme-ui/presets";

console.log("chakra", chakra);
console.log("custom", custom);

console.log("baseChakra", baseChakra);

export default {
  rebassMaterial,
  funked,
  custom,
  baseChakra,
  chakra,
  ...presets,
};
