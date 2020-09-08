/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Components from "./components.jsx";
import {
  TypeScale,
  TypeStyle,
  ColorPalette,
  FontFamily,
  HeadingStyle,
} from "@theme-ui/style-guide";

export default ({ theme }) => {
  return (
    <Styled.root sx={{ backgroundColor: "background", color: "text" }}>
      <Styled.h1 sx={{ textAlign: "center", fontSize: "3em" }}>
        {theme} Theme UI Preset
      </Styled.h1>
      <Styled.h1>Colors</Styled.h1>
      <ColorPalette omit={["modes", "header"]} />
      <Components />
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
  );
};
