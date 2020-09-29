/** @jsx jsx */
import { jsx, Box, Flex, Close } from "theme-ui";

import { MenuItem, MenuCamel } from "../../components";
import { Link } from "react-router-dom";

export default ({ userId: id }) => {
  return (
    <Flex bg="muted" p={2} sx={{ alignItems: "center" }}>
      <MenuCamel />
      <MenuItem to="#">Editor</MenuItem>
      <Box mx="auto" />
      <MenuItem to="/logout">Logout</MenuItem>
      <Close as={Link} to={`../../u/${id}`} />
    </Flex>
  );
};
