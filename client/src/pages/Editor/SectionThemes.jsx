/** @jsx jsx */
import { jsx } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Header, Icon } from "semantic-ui-react";
import { changePortfolioTheme, selectCurrentUserPortfolio } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const SectionThemes = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(selectCurrentUserPortfolio);
  const setTheme = theme => dispatch(changePortfolioTheme(theme));

  return (
    <Section name="Themes" icon="paint brush">
      <div sx={{ p: "1em" }}>
        <Header>Manage pages</Header>
        <div sx={{ textAlign: "left" }}>
          <label>
            <Icon name="paint brush" />
            Base Theme
          </label>
          <ThemeSelector theme={portfolio.theme} setTheme={setTheme} />
        </div>
      </div>
    </Section>
  );
};
export default SectionThemes;
