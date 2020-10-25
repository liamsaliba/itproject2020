/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { Checkbox, Button, Icon } from "semantic-ui-react";
import { selectUser, updateUser } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../../components";
import { isTrue } from "../../helpers";

const Toggle = ({ value, setValue, icon, label }) => {
  const onChange = (_, { checked }) => {
    // set to the new value of checked
    setValue(checked.toString());
  };

  return (
    <Checkbox
      toggle
      onChange={onChange}
      checked={isTrue(value)}
      label={
        <label>
          {icon ? <Icon name={icon} /> : null}
          {label}
        </label>
      }
    />
  );
};

const SectionSettings = () => {
  const singlePages = useSelector(state => selectUser(state).useSinglePages);
  const dispatch = useDispatch();
  const contact = useSelector(state => selectUser(state).allowContact);

  return (
    <Section name="Settings" icon="settings">
      <div
        sx={{
          "& div": {
            mb: "1em",
          },
        }}
      >
        <div sx={{ textAlign: "left" }}>
          <Toggle
            label="Enable contact form"
            icon="address book"
            value={contact}
            setValue={value => dispatch(updateUser({ allowContact: value }))}
          />
        </div>
        <div sx={{ textAlign: "left" }}>
          <Toggle
            label="Use single pages"
            icon="file"
            value={singlePages}
            setValue={value => dispatch(updateUser({ useSinglePages: value }))}
          />
        </div>
        <div>
          <Button icon primary labelPosition="left" as={Link} to="/settings">
            <Icon name="settings" />
            User Settings
          </Button>
        </div>
      </div>
    </Section>
  );
};
export default SectionSettings;
