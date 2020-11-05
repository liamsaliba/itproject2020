/** @jsx jsx */
import { jsx, Styled, Box, Button, useThemeUI } from "theme-ui";
import Section from "./Section";
import { ThemeSelector } from "../../components";
import {
  Header,
  Popup,
  Button as SemanticButton,
  Divider,
} from "semantic-ui-react";
import {
  changePortfolioTheme,
  selectPortfolioTheme,
  selectUsername,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Colours from "../../themes/Colours";
import Fonts from "../../themes/Fonts";
import makeTheme from "../../themes/makeTheme";
import EditorProvider from "../../themes/EditorProvider";

const ThemeEditor = ({ theme: initialTheme, updateTheme }) => {
  const [theme, sTheme] = useState(initialTheme);
  const [dirty, setDirty] = useState(false);
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

  const resetTheme = () => {
    setTheme(initialTheme);
  };

  useEffect(() => {
    const isDirty = () => {
      // no object equality in js :(
      return (
        initialTheme.base !== theme.base ||
        initialTheme.colours.primary !== theme.colours.primary ||
        initialTheme.colours.background !== theme.colours.background ||
        initialTheme.colours.text !== theme.colours.text ||
        initialTheme.fonts.body !== theme.fonts.body ||
        initialTheme.fonts.heading !== theme.fonts.heading ||
        initialTheme.fonts.monospace !== theme.fonts.monospace
      );
    };

    setDirty(isDirty());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

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
      <SemanticButton.Group fluid compact attached="bottom">
        <SemanticButton
          icon="undo"
          content="Discard"
          disabled={!dirty}
          negative={dirty}
          onClick={() => resetTheme()}
        />
        <SemanticButton
          icon="save"
          content="Save"
          disabled={!dirty}
          positive={dirty}
          onClick={() => updateTheme(theme)}
        />
      </SemanticButton.Group>
      <Popup
        disabled={!dirty}
        position="bottom left"
        trigger={
          <Box
            sx={{
              textAlign: "center",
              mb: "-0.5em",
            }}
          >
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
              }}
              sx={{ m: 0 }}
            />
          </Box>
        }
        content="Changing base theme will reset colours and fonts."
        basic
      />

      <Divider horizontal>
        <Header as="h4">Fonts</Header>
      </Divider>
      <Fonts setTheme={setTheme} />
      {/* <FontPreview /> */}
      <Divider horizontal>
        <Header as="h4">Colours</Header>
      </Divider>
      <Box
        sx={{
          m: "-1em 0",
          "& div div": {
            // ensure no collision issues with coloour picker
            zIndex: "3",
          },
          "& > div > div > div": {
            justifyContent: "center",
          },
          "& > div > div > div > div > div:hover": {
            border: "1px black solid",
            transition: "all .2s ease-out",
          },
          textAlign: "center",
        }}
      >
        <Colours size="60px" setTheme={setTheme} />
      </Box>
    </Styled.root>
  );
};

const SectionThemes = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const theme = useSelector(state => selectPortfolioTheme(state, username));

  const [selectedTheme, setSelectedTheme] = useState(theme);

  const setTheme = theme => {
    dispatch(changePortfolioTheme(theme));
    setSelectedTheme(theme);
  };

  return (
    <Section name="Themes" icon="paint brush">
      <div sx={{ p: "0.5em", pt: "0", mt: "-0.5em", textAlign: "left" }}>
        <Divider horizontal>
          <Header as="h3">Customise Theme</Header>
        </Divider>
        <div>
          <EditorProvider theme={makeTheme(theme)}>
            <ThemeEditor theme={selectedTheme} updateTheme={setTheme} />
          </EditorProvider>
        </div>
      </div>
    </Section>
  );
};
export default SectionThemes;
