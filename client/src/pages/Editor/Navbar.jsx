/** @jsx jsx */
import { jsx, Box, Flex, MenuButton } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem, MenuImage } from "../../components";
import { Link as ReachLink } from "@reach/router";

export default ({ userId: id }) => {
  return (
    <Flex bg="muted" p={2}>
      <MenuImage src={camel} to="/" />
      <Box mx="auto" />
      <MenuItem to="/logout">Logout</MenuItem>
      <MenuButton as={ReachLink} to={`../../u/${id}`} />
    </Flex>
  );
};
