/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Checkbox, Icon } from "semantic-ui-react";
import {
  changePortfolioTheme,
  selectCurrentUserPortfolio,
  selectUser,
  updateUser,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";

const ContactSwitch = () => {
  const contact = useSelector(state => selectUser(state).allowContact);
  const dispatch = useDispatch();

  const onChange = (e, { checked }) => {
    console.log("checked", checked);
    dispatch(updateUser({ allowContact: !checked }));
  };

  return <Checkbox toggle onChange={onChange} checked={contact} />;
};

const SectionSettings = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const setTheme = theme => dispatch(changePortfolioTheme(theme));

  return (
    <Section name="Settings" icon="settings">
      <div>
        <Icon name="paint brush" />
        Theme
        <ThemeSelector theme={portfolio.theme} setTheme={setTheme} />
      </div>
      <div>
        <Icon name="address book" />
        Contact form
        <ContactSwitch />
      </div>
    </Section>
  );
};
export default SectionSettings;
