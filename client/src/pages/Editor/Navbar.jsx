/** @jsx jsx */
import { jsx, Box, Flex, Close } from "theme-ui";

import { MenuItem, MenuCamel } from "../../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsername } from "../../store";

export default () => {
  const id = useSelector(selectUsername);

  return (
    <Flex p={2} sx={{ alignItems: "center" }}>
      <MenuCamel />
      <MenuItem to="#">Editor</MenuItem>
      <Box mx="auto" />
      <Close as={Link} to={`/u/${id}`} />
    </Flex>
  );
};
