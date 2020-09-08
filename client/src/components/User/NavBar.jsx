import React from "react";
import { Box, Avatar, Flex } from "theme-ui";
import camel from "../../svg/camel.svg";

import { MenuItem } from "../NavItems";
import ThemeSelector from "./../ThemeSelector";

const styling = {
  left: "35%",
  position: "absolute",
  justifyContent: "center",
};

export default props => {
  const { userId: id, theme, setTheme } = props;
  return (
    <Box p={10}>
      <Flex as="nav" sx={{ alignItems: "center" }}>
        <Avatar src={camel} />
        <Box sx={styling}>
          <MenuItem to={`../${id}`}>Home</MenuItem>
          <MenuItem to={`../${id}/about`}>About</MenuItem>
          <MenuItem to={`../${id}/contacts`}>Contacts</MenuItem>
          <MenuItem to={`../${id}/projects`}>Projects</MenuItem>
          <MenuItem to={`../${id}/publications`}>Publications</MenuItem>
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </Box>
      </Flex>
    </Box>
  );
};
