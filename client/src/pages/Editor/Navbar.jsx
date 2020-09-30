/** @jsx jsx */
import { jsx, Box, Flex, Close } from "theme-ui";

import { MenuItem, MenuCamel } from "../../components";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

export default ({ userId: id }) => {
  return (
    <Flex p={2} sx={{ alignItems: "center" }}>
      <MenuCamel />
      <MenuItem to="#">Editor</MenuItem>
      <Box mx="auto" />
      <MenuItem to="/logout">
        <Icon name="sign out" />
        Logout
      </MenuItem>
      <Close as={Link} to={`../../u/${id}`} />
    </Flex>
  );
};
