/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

import { MenuItem, MenuCamel, ProfileDropdown } from "../../components";
import { Link } from "react-router-dom";

export default ({ userId: id }) => {
  return (
    <Flex p={2} sx={{ alignItems: "center" }}>
      <MenuCamel />
      <MenuItem to="#">Editor</MenuItem>
      <Box mx="auto" />
      <ProfileDropdown
        userId={id}
        items={[
          { as: Link, to: `/u/${id}`, icon: "close", text: "Close Editor" },
        ]}
      ></ProfileDropdown>
    </Flex>
  );
};
