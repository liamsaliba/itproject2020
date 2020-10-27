/** @jsx jsx */
import { jsx } from "theme-ui";
import { MenuItem, Navbar } from "../../components";
import { selectFullName } from "../../store";
import { useSelector } from "react-redux";

export default props => {
  const fullName = useSelector(state => selectFullName(state, props.userId));
  return (
    <Navbar stackable style={{ border: "none" }} attached="bottom">
      <Navbar.Left>
        <MenuItem to="/">camel_case</MenuItem>
        <div sx={{ p: 2 }}>
          {fullName} / {props.userId}
        </div>
      </Navbar.Left>
      <Navbar.Right>
        <MenuItem href="https://github.com/exradr/itproject2020">
          GitHub
        </MenuItem>
        <MenuItem href="mailto:support+camelpages2020@gmail.com">
          Support
        </MenuItem>
        <MenuItem href="mailto:abuse+camelpages2020@gmail.com">
          Report Abuse
        </MenuItem>
      </Navbar.Right>
    </Navbar>
  );
};
