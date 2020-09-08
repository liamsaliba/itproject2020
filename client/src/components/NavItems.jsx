/** @jsx jsx */
import { jsx, Button, NavLink } from "theme-ui";
import { Link as ReachLink } from "@reach/router";
import isAbsoluteURL from "is-absolute-url";

const styles = {
  variant: "links.nav",
};

export const Link = ({ href, ...props }) => {
  const isExternal = isAbsoluteURL(href || "");
  if (isExternal) {
    return <a {...props} href={href} sx={styles} />;
  }
  const to = props.to || href;
  return <ReachLink {...props} to={to} sx={styles} activeClassName="active" />;
};

export const MenuItem = props => (
  <NavLink {...props} as={Link} activeClassName="active" p={2}>
    {props.children}
  </NavLink>
);

export const MenuButton = props => (
  <Button {...props} as={Link} variant="outline" ml={2} p={2}>
    {props.children}
  </Button>
);
