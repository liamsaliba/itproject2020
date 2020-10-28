/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import { ColorPalette } from "@theme-ui/style-guide";
import ColorPicker from "../ColorPicker";

// modified from https://github.com/system-ui/theme-ui/blob/master/packages/editor/src/Theme/Colors.tsx

const Colours = props => {
  const context = useThemeUI();
  // TODO: Remove any after @theme-ui/color-mode was transformed to TypeScript
  const mode = context.colorMode;
  const { colors } = context.theme || {};

  const onChange = key => val => {
    let next = {};
    if (
      mode &&
      colors &&
      colors.modes &&
      colors.modes[mode] &&
      mode !== context.theme.initialColorMode
    ) {
      next = {
        colors: {
          modes: {
            [mode]: {
              [key]: val.hex,
            },
          },
        },
      };
    } else {
      next = {
        colors: {
          [key]: val.hex,
        },
      };
    }
    context.setTheme(next);
  };

  return (
    <ColorPalette
      {...props}
      mode={mode}
      render={({ swatch, color, key, ...rest }) => (
        <ColorPicker key={key} color={color} onChange={onChange(key)}>
          {swatch}
        </ColorPicker>
      )}
    />
  );
};

export default Colours;
