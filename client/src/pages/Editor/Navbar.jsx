/** @jsx jsx */
import { jsx, Box, Avatar, Flex, MenuButton } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem } from "../../components";
import { Link as ReachLink } from "@reach/router";

export default ({ userId: id }) => {
  return (
    <Flex bg="blue">
      <Avatar src={camel} />
      <Box mx="auto" />
      <MenuItem to="/logout">Logout</MenuItem>
      <MenuButton as={ReachLink} to={`../../u/${id}`} />
    </Flex>
  );
};
