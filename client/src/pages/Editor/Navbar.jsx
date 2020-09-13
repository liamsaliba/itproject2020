/** @jsx jsx */
import { jsx, Box, Flex, Close } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem, MenuImage } from "../../components";
import { Link } from "react-router-dom";

export default ({ userId: id }) => {
  return (
    <Flex bg="muted" p={2} sx={{ alignItems: "center" }}>
      <MenuImage src={camel} to="/" />
      <MenuItem to="#">Editor</MenuItem>
      <Box mx="auto" />
      <MenuItem to="/logout">Logout</MenuItem>
      <Close as={Link} to={`../../u/${id}`} />
    </Flex>
  );
};
