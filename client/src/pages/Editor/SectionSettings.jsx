/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Icon } from "semantic-ui-react";
import { changePortfolioTheme, selectCurrentUserPortfolio } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";

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
        <Icon name="paint brush" />
        Theme
        <Button negative icon="warning sign">
          Delete Portfolio
        </Button>
      </div>
    </Section>
  );
};
export default SectionSettings;
