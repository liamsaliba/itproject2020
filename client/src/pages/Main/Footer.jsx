/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import { MenuItem, Navbar } from "../../components";

export default () => {
  return (
    <Navbar attached="bottom">
      <Navbar.Left>
        <Flex sx={{ alignItems: "center" }}>
          <MenuItem to="/">camel_case</MenuItem>
          <div sx={{ p: 2 }}>
            is Josh Nguyen, Lawrence Leong, Liam Saliba, Chan Jie Ho and Yung
            Cheng Kong. 2020
          </div>
          <Box mx="auto" />
        </Flex>
      </Navbar.Left>
      <Navbar.Right>
        <MenuItem href="https://github.com/exradr/itproject2020">
          GitHub
        </MenuItem>
        <MenuItem href="https://www.youtube.com/watch?v=Vhh_GeBPOhs">
          Support
        </MenuItem>
      </Navbar.Right>
    </Navbar>
  );
};
