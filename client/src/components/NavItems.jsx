/** @jsx jsx */
import { jsx, Button, NavLink, Image, IconButton } from "theme-ui";
import { Link as ReachLink } from "@reach/router";
import isAbsoluteURL from "is-absolute-url";

const styles = {
  variant: "links.nav",
};

export const Link = ({ href, ...props }) => {
  const isExternal = isAbsoluteURL(href || "");
  if (isExternal) {
    return (
      <a {...props} href={href} sx={styles}>
        {props.children}
      </a>
    );
  }
  const to = props.to || href;
  return <ReachLink {...props} to={to} sx={styles} />;
};

export const MenuItem = props => (
  <NavLink {...props} as={Link} variant="nav" p={2}>
    {props.children}
  </NavLink>
);

export const MenuButton = props => (
  <Button {...props} as={Link} variant="nav" m={2} p={2}>
    {props.children}
  </Button>
);

export const MenuImage = props => (
  <IconButton {...props} as={Link} m={2} variant="logo">
    <Image src={props.src} variant="logo" sx = {{borderRadius:"50%"}}/>
  </IconButton>
);
