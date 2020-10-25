/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Icon } from "semantic-ui-react";
import { changePortfolioTheme, selectCurrentUserPortfolio } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const SectionThemes = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const setTheme = theme => dispatch(changePortfolioTheme(theme));

  return (
    <Section name="Themes" icon="paint brush">
      <div>
        <Icon name="paint brush" />
        Theme
        <ThemeSelector theme={portfolio.theme} setTheme={setTheme} />
      </div>
    </Section>
  );
};
export default SectionThemes;
