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
  Silom: "Silom,monospace",
};

const Fonts = ({ setTheme }) => {
  const context = useThemeUI();
  const { fonts: defaults } = context.theme || {};
  const [fonts, setFonts] = useState(defaults);

  const options = type =>
    Object.entries(defaultFonts).map(([key, value]) => {
      return {
        key,
        text: key,
        value,
        content: <p sx={{ fontFamily: value, fontWeight: type }}>{key}</p>,
      };
    });

  const onChange = key => val => {
    const updated = { [key]: val };
    setFonts({
      ...fonts,
      ...updated,
    });
    setTheme({ fonts: updated });
  };

  const FontSelector = ({ name, icon, label }) => {
    return (
      <div
        key={name}
        sx={{
          fontFamily: fonts[name],
          mb: "0.5em",
        }}
      >
        <label sx={{ fontFamily: "sans-serif" }}>
          <Icon name={icon} />
          {label}
        </label>
        <Dropdown
          scrolling
          search
          fluid
          selection
          label={name}
          placeholder={name}
          options={options(name)}
          name={"fonts." + name}
          value={fonts[name]}
          onChange={(e, { value }) => onChange(name)(value)}
        />
      </div>
    );
  };

  return (
    <Fragment>
      <FontSelector name="heading" label="Heading" icon="heading" />
      <FontSelector name="body" label="Body" icon="paragraph" />
      <FontSelector name="monospace" label="Mono / Secondary" icon="code" />
    </Fragment>
  );
};

export default Fonts;
