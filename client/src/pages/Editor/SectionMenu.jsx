/** @jsx jsx */
import { jsx } from "theme-ui";
import { Menu, Icon } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { changeAccordion, selectAccordion } from "../../store";

const SectionMenu = props => {
  const active = useSelector(selectAccordion);
  const dispatch = useDispatch();

  const handleClick = (e, { name }) => {
    dispatch(changeAccordion(name));
  };

  const Item = ({ name, icon }) => (
    <Menu.Item name={name} active={active === name} onClick={handleClick}>
      <Icon name={icon} />
      {name}
    </Menu.Item>
  );

  return (
    <Menu compact fluid tabular size="small" widths={3}>
      <Item name="Theme" icon="paint brush" />
      <Item name="Pages" icon="file text" />
      <Item name="Media" icon="file image" />
      {/* <Item name="Text Editor" icon="paragraph" /> */}
    </Menu>
  );
};

export default SectionMenu;
