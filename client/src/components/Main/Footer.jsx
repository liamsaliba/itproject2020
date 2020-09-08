/** @jsx jsx */
import { jsx } from "theme-ui";
import { MenuItem } from "../NavItems";

export default () => {
  return (
    <footer
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
    </footer>
  );
};
