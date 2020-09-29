/** @jsx jsx */
import { jsx, Box, Styled } from "theme-ui";

const Toast = props => (
  <Box>
    {props.title ? <Styled.h3 p={0}>{props.title}</Styled.h3> : null}
    {props.message ? <Styled.p p={0}>{props.message}</Styled.p> : null}
    {props.technical ? <small>{props.technical}</small> : null}
  </Box>
);

export default Toast;
