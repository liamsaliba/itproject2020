/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";

import { MenuItem, MenuCamel, ProfileDropdown } from "../../components";
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
      <ProfileDropdown
        items={[
          {
            as: Link,
            to: `/u/${id}`,
            icon: "close",
            key: "close:",
            text: "Close Editor",
          },
        ]}
      ></ProfileDropdown>
    </Flex>
  );
};
