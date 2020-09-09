/** @jsx jsx */
import { jsx, Flex, Box } from "theme-ui";
import { MenuItem } from "../../components";

export default () => {
  return (
    <Flex
      as="footer"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 2,
        variant: "styles.footer",
      }}
    >
      <MenuItem to="/">camel_case</MenuItem>
      <div sx={{ p: 2 }}>
        is Josh Nguyen, Lawrence Leong, Liam Saliba, Chan Jie Ho and Yung Cheng
        Kong. 2020
      </div>
      <Box mx="auto" />
      <div>
        <MenuItem href="https://github.com/exradr/itproject2020">
          GitHub
        </MenuItem>
        <MenuItem href="https://www.youtube.com/watch?v=Vhh_GeBPOhs">
          Support
        </MenuItem>
      </div>
    </Flex>
  );
};
