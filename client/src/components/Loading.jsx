/** @jsx jsx */
import { jsx } from "theme-ui";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import CenterFlex from "./CenterFlex";

const Loading = props => (
  <CenterFlex>
    <Dimmer active inverted>
      <Loader inverted>{props.children}</Loader>
    </Dimmer>
  </CenterFlex>
);

export default Loading;
