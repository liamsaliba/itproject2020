/** @jsx jsx */
import { jsx, Box, Flex, Close } from "theme-ui";

import { MenuItem, MenuCamel } from "../../components";
export default ({ closeEditor }) => {
  return (
    <Flex p={2} sx={{ alignItems: "center" }}>
      <MenuCamel />
      <MenuItem to="/">Camel Pages</MenuItem>
      <Box mx="auto" />
      <Close onClick={closeEditor} />
    </Flex>
  );
};
