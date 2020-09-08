/** @jsx jsx */
import { jsx } from "theme-ui";
import { Helmet } from "react-helmet";

export default props => {
  let t = "ePortfolio";
  if (props.children) t = props.children + " - " + t;
  return (
    <Helmet {...props}>
      <title>{t}</title>
    </Helmet>
  );
};
