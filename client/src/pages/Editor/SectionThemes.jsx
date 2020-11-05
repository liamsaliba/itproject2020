/** @jsx jsx */
import { jsx, Styled, Box, Button, useThemeUI } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import { Header } from "semantic-ui-react";
import {
  changePortfolioTheme,
  selectPortfolioTheme,
  selectUsername,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Colours from "../../themes/Colours";
import Fonts from "../../themes/Fonts";
import makeTheme from "../../themes/makeTheme";
import EditorProvider from "../../themes/EditorProvider";

const ThemeEditor = ({ theme: initialTheme, updateTheme }) => {
  const [theme, sTheme] = useState(initialTheme);
  const context = useThemeUI();

  const setTheme = updated => {
    // will reset colours and fonts
    if (updated.base) {
      const newTheme = { base: updated.base, fonts: {}, colours: {} };

      console.log("saved theme", newTheme);
      sTheme(newTheme);
      context.setTheme(makeTheme(newTheme));
    } else {
      const newTheme = {
        fonts: {
          ...theme.fonts,
          ...updated.fonts,
        },
        colours: {
          ...theme.colours,
          ...updated.colours,
        },
        base: theme.base,
      };
      console.log("saved (updated) theme", newTheme);
      sTheme(newTheme);
      context.setTheme(makeTheme(newTheme, context.theme));
    }
  };

  const isDirty = () =>
    initialTheme.base !== theme.base ||
    initialTheme.colour !== theme.colour ||
    initialTheme.font !== theme.font;

  return (
    <Styled.root>
      <Box
        sx={{
          bg: "background",
          p: "1em",
          color: "text",
          border: "1px solid black",
          "*": {
            transition: "all .2s ease-out",
          },
        }}
      >
        <Styled.h3>Theme preview!</Styled.h3>
        <Styled.p>This is what the text on your portfolio looks like.</Styled.p>
        <Styled.p sx={{ fontFamily: "monospace", opacity: 0.8 }}>
          Some emphasised text.
        </Styled.p>
        <Button sx={{ bg: "primary", color: "background", p: 2 }}>
          Action
        </Button>
      </Box>
      <Box>
        <Box sx={{ m: "1em 0", display: "inline-block" }}>
          <Header as="h4">
            {/* <Icon name="paint brush" size="small" /> */}
            Base Theme
          </Header>
        </Box>
        <ThemeSelector
          theme={theme.base}
          setTheme={base => {
            setTheme({ base });

            // updateTheme(newTheme);
          }}
          sx={{ m: 0 }}
        />
      </Box>
      <p>Changing base theme will reset colours and fonts.</p>
      <Box sx={{ m: "0.8em 0" }}>
        <Header as="h4">Colours</Header>
      </Box>
      <Box
        sx={{
          m: "-1em 0",
          "& div div": {
            zIndex: "3",
          },
        }}
      >
        <Colours size="60px" setTheme={setTheme} />
      </Box>
      <Box sx={{ m: "0.8em 0" }}>
        <Header as="h4">Fonts</Header>
      </Box>
      <Fonts setTheme={setTheme} />
      {/* <FontPreview /> */}
    </Styled.root>
  );
};

const SectionThemes = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const theme = useSelector(state => selectPortfolioTheme(state, username));

  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [preset, setPreset] = useState(makeTheme(theme));

  const setTheme = theme => {
    dispatch(
      changePortfolioTheme(
        // TODO:
        theme
      )
    );
    setSelectedTheme(theme);
  };

  return (
    <Section name="Themes" icon="paint brush">
      <div sx={{ p: "1em", pt: "0", textAlign: "left" }}>
        <Box sx={{ mb: "0.8em" }}>
          <Header as="h3">Customise Theme</Header>
        </Box>
        <div>
          <EditorProvider theme={preset}>
            <ThemeEditor theme={selectedTheme} updateTheme={setTheme} />
          </EditorProvider>
        </div>
      </div>
    </Section>
  );
};
export default SectionThemes;
