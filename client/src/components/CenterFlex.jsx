/** @jsx jsx */
import { jsx, Flex } from "theme-ui";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "1 1 auto",
  height: "100%",
  flexDirection: "column",
};

const CenterFlex = props => <Flex {...props} sx={{ ...props.sx, ...style }} />;

export default CenterFlex;
