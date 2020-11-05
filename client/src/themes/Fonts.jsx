/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import { Fragment, useState } from "react";
// import Combobox from "../Combobox";
import { Dropdown, Icon } from "semantic-ui-react";

const defaultFonts = {
  Default: "inherit",
  System:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  Helvetica: '"Helvetica Neue", Helvetica, Inter, Arial, sans-serif',
  Avenir: '"Avenir Next", Helvetica, Arial, sans-serif',
  Verdana: "Verdana, sans-serif",
  Georgia: "Georgia, serif",
  Roboto: "Roboto, system-ui, sans-serif",
  "Roboto Condensed": '"Roboto Condensed", sans-serif',
  "Roboto Mono": '"Roboto Mono", monospace',
  "Roboto Slab": '"Roboto Slab", serif',
  "Open Sans": '"Open Sans", sans-serif',
  Lato: "Lato, sans-serif",
  Montserrat: "Montserrat, sans-serif",
  "Source Sans Pro": '"Source Sans Pro", sans-serif',
  "Source Serif Pro": '"Source Serif Pro", serif',
  "Source Code Pro": '"Source Code Pro", monospace',
  "Space Mono": '"Space Mono", monospace',
  Inconsolata: '"Inconsolata", monospace',
  Raleway: '"Raleway", sans-serif',
  Oswald: '"Oswald", sans-serif',
  Merriweather: '"Merriweather", serif',
  "Inknut Antiqua": '"Inknut Antiqua", serif',
  Poppins: '"Poppins", sans-serif',
  Menlo: "Menlo, monospace",
  Silom: "Silom, monospace",
};

const Fonts = ({ setTheme }) => {
  const context = useThemeUI();
  const { fonts: defaults } = context.theme || {};
  const [fonts, setFonts] = useState(defaults);

  const options = Object.entries(defaultFonts).map(([key, value]) => {
    // console.log(key, value);
    return {
      key,
      text: key,
      value,
      content: <p sx={{ fontFamily: value }}>{key}</p>,
    };
  });

  const icons = {
    heading: "heading",
    body: "paragraph",
    monospace: "code",
  };

  const onChange = key => val => {
    // console.log("change to", key, val);
    const updated = { [key]: val };
    // context.setTheme({
    //   fonts: {
    //     ...updated,
    //   },
    // });
    setFonts({
      ...fonts,
      ...updated,
    });
    setTheme(updated);
  };

  return (
    <Fragment>
      {Object.keys(fonts).map(key => {
        console.log(key, fonts[key]);
        return (
          <div
            key={key}
            sx={{
              fontFamily: fonts[key],
              mb: "1em",
            }}
          >
            <label sx={{ fontFamily: "sans-serif" }}>
              <Icon name={icons[key]} />
              {key}
            </label>
            <Dropdown
              scrolling
              search
              fluid
              selection
              label={key}
              placeholder={key}
              options={options}
              name={"fonts." + key}
              value={fonts[key]}
              onChange={(e, { value }) => onChange(key)(value)}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default Fonts;
