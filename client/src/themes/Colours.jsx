/** @jsx jsx */
import { jsx, useThemeUI } from "theme-ui";
import { ColorPalette } from "@theme-ui/style-guide";
import { ColorPicker } from "@theme-ui/editor";
// import { fontSizes } from "./Base.theme";

// modified from https://github.com/system-ui/theme-ui/blob/master/packages/editor/src/Theme/Colors.tsx

const Colours = ({ setTheme, ...props }) => {
  const context = useThemeUI();
  const mode = context.colorMode;

  const onChange = key => val => {
    const updated = { [key]: val.hex };
    setTheme({ colours: updated });
  };

  return (
    <ColorPalette
      {...props}
      mode={mode}
      render={({ swatch, color, key, ...rest }) => {
        if (
          ![
            "text",
            "background",
            "primary",
            // , "secondary", "muted"
          ].includes(key)
        )
          return null;
        return (
          <ColorPicker key={key} color={color} onChange={onChange(key)}>
            {swatch}
          </ColorPicker>
        );
      }}
      sx={{
        ...props.sx,
        margin: "0.5em",
        fontSize: "0.9em",
        textAlign: "center",
        fontFamily: "sans-serif",
        flexWrap: "nowrap",
        overflow: "hidden",
        width: props.size,
      }}
    />
  );
};

export default Colours;
