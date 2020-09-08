/** @jsx jsx */
import { jsx, Box, Avatar, Flex, MenuButton } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem } from "../NavItems";
import { Link as ReachLink } from "@reach/router";

export default ({ userId: id }) => {
  return (
    <Flex as="nav" p={10} bg="red">
      <Avatar src={camel} />

      <Box mx="auto" />
      <MenuButton as={ReachLink} to={`../../u/${id}`} />
    </Flex>
  );
};
