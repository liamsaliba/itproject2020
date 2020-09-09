import React from "react";
import { Box, Flex } from "theme-ui";
import camel from "../../svg/Profile_example.png";

import { MenuItem, MenuImage, ThemeSelector } from "../../components";

export default props => {
  const { userId: id, theme, setTheme, pages } = props;

  let menuItems = pages.map(name => (
    <MenuItem to={`#${name}`}>{name}</MenuItem>
  ));

  menuItems[0] = <MenuItem to={`#`}>{id}</MenuItem>;

  return (
    <Box p={10}>
      <Flex as="nav">
      <Box sx={{flex:1}}> 
        <MenuImage src={camel} to="#"/>
      </Box> 

      <Box sx={{display:"flex",flex:2, justifyContent:"center"}}>
        {menuItems}
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </Box> 

      <Box sx={{flex:1}} />
      </Flex>
    </Box>
  );
};
