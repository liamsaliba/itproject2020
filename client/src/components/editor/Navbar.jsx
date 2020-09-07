/** @jsx jsx */
import { jsx, Box, Image, Flex } from "theme-ui";
import { MenuItem } from "../NavItems";

export default ({ userId: id }) => {
  return (
    <Box p={10} bg="secondary">
      <Flex as="nav">
        <Image />
        <Box mx="auto" />
        <MenuItem to={`../../u/${id}`}>Preview</MenuItem>
      </Flex>
    </Box>
  );
};
