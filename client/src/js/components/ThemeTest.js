/** @jsx jsx */
import { jsx, Styled, components } from "theme-ui";
import { useState } from "react";
import * as presets from "@theme-ui/presets";

export default () => {
  const [theme, setTheme] = useState("base");
  const preset = presets[theme];

  return (
    <div
      sx={{
        "*": {
          transition: "all .2s ease-out",
        },
      }}
    >
      <label
        htmlFor="theme"
        sx={{
          display: "block",
          mb: 4,
        }}
      >
        Preset:
        <Select
          id="theme"
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value);
          }}
        >
          {Object.keys(presets).map((key) => (
            <option key={key} children={key} />
          ))}
        </Select>
      </label>
      <ThemeContext.Provider value={preset}>
        <Styled.root>
          <Styled.h2>Colors</Styled.h2>
          <ColorPalette omit={["modes", "header"]} />
          <Styled.h2>Typography</Styled.h2>
          <TypeStyle fontSize={7}>
            Body: <FontFamily name="body" />
          </TypeStyle>
          <HeadingStyle
            fontFamily="heading"
            fontWeight="heading"
            lineHeight="heading"
            fontSize={7}
          >
            Heading: <FontFamily name="heading" />
          </HeadingStyle>
          <Styled.h2>Type Scale</Styled.h2>
          <TypeScale />
          <MDXProvider components={components}>
            <Lorem />
          </MDXProvider>
          <Styled.h2 id="json">Raw JSON</Styled.h2>
          <textarea
            value={JSON.stringify(preset, null, 2)}
            rows={16}
            readOnly
            aria-labelledby="json"
            sx={{
              width: "100%",
              fontFamily: "monospace",
              bg: "muted",
              border: 0,
              borderRadius: 4,
            }}
          />
        </Styled.root>
      </ThemeContext.Provider>
    </div>
  );
};
