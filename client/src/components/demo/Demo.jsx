/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "theme-ui";
import * as presets from "@theme-ui/presets";
/* eslint-disable import/no-webpack-loader-syntax */
import Components from "!babel-loader!mdx-loader!./components.mdx";
import { MDXProvider } from "@theme-ui/mdx";
import {
  TypeScale,
  TypeStyle,
  ColorPalette,
  FontFamily,
  HeadingStyle,
} from "@theme-ui/style-guide";

export default ({ theme }) => {
  const preset = presets[theme];

  return (
    <ThemeProvider theme={preset}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Architects+Daughter|Montserrat:400,700|Poppins:400,700,900|Roboto:400,600"
        />
      </Helmet>
      <Styled.root sx={{ backgroundColor: "background", color: "text" }}>
        {console.log(preset.colors)}
        <Styled.h1 sx={{ textAlign: "center", fontSize: "3em" }}>
          {theme} Theme UI Preset
        </Styled.h1>
        <Styled.h1>Colors</Styled.h1>
        <ColorPalette omit={["modes", "header"]} />
        <MDXProvider>
          <Components />
        </MDXProvider>
        <Styled.h2>Typography</Styled.h2>
        <TypeStyle fontSize={1}>
          Body: <FontFamily name="body" />
        </TypeStyle>
        <HeadingStyle
          fontFamily="heading"
          fontWeight="heading"
          lineHeight="heading"
          fontSize={1}
        >
          Heading: <FontFamily name="heading" />
        </HeadingStyle>
        <Styled.h2>Type Scale</Styled.h2>
        <TypeScale />
      </Styled.root>
    </ThemeProvider>
  );
};
