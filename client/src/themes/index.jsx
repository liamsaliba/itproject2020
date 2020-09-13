import rebassMaterial from "@rebass/preset-material";
import custom from "./Main.theme";
import funked from "./Funked.theme";
// import baseChakra from "./BaseChakra.theme";
// import { theme as chakra } from "@chakra-ui/core";

import * as presets from "@theme-ui/presets";

export default {
  rebassMaterial,
  funked,
  custom,
  // baseChakra,
  // chakra,
  ...presets,
};
