/** @jsx jsx */
import { jsx, Box, Flex, MenuButton } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem, MenuImage } from "../../components";

export default ({ userId: id }) => {
  return (
    <Flex bg="muted" p={2} sx={{ alignItems: "center" }}>
      <MenuImage src={camel} to="/" />
      <Box mx="auto" />
      <MenuItem to="/logout">Logout</MenuItem>
      <MenuButton to={`../../u/${id}`} />
    </Flex>
  );
};
