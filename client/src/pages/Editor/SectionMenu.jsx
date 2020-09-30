/** @jsx jsx */
import { jsx } from "theme-ui";
import { Menu, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { changeAccordion, selectAccordion } from "../../store";

const SectionMenu = props => {
  const active = useSelector(selectAccordion);
  const dispatch = useDispatch();

  const handleClick = (e, { name }) => {
    dispatch(changeAccordion(active === name ? null : name));
  };

  const Item = ({ name, icon }) => (
    <Menu.Item name={name} active={active === name} onClick={handleClick}>
      <Icon name={icon} />
      {name}
    </Menu.Item>
  );

  return (
    <Menu vertical fluid primary borderless sx={{ m: "0 !important" }}>
      <Item name="Settings" icon="settings" />
      <Item name="Pages" icon="file text" />
      <Item name="Create Artifacts" icon="file" />
      {/* <Item name="Text Editor" icon="paragraph" /> */}
    </Menu>
  );
};

export default SectionMenu;
