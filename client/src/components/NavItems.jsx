/** @jsx jsx */
import {
  jsx,
  Button,
  Image,
  IconButton,
  NavLink as StyledNavLink,
} from "theme-ui";
import { NavHashLink, HashLink } from "react-router-hash-link";
import isAbsoluteURL from "is-absolute-url";

const styles = {
  variant: "links.nav",
};

const GenericLink = (LinkComponent, { href, ...props }) => {
  const isExternal = isAbsoluteURL(href || "");
  if (isExternal) {
    return (
      <a {...props} href={href} sx={styles}>
        {props.children}
      </a>
    );
  }
  const to = props.to || href;
  return <LinkComponent {...props} to={to} sx={styles} smooth />;
};

export const NavLink = props => GenericLink(NavHashLink, props);
export const Link = props => GenericLink(HashLink, props);

export const MenuItem = props => (
  <StyledNavLink
    {...props}
    as={Link}
    activeClassName="nactive"
    sx={{
      ...props.sx,
      variant: "links.nav",
    }}
    smooth // smooth scroll to element
    p={2}
  >
    {props.children}
  </StyledNavLink>
);

export const MenuButton = props => (
  <Button {...props} as={Link} variant="nav" m={2} p={2}>
    {props.children}
  </Button>
);

export const MenuImage = props => {
  // Add default value for props.round!
  const imageCircle = props.round ? { borderRadius: "50%" } : {};

  return (
    <IconButton {...props} as={Link} m={2} variant="logo">
      <Image src={props.src} variant="logo" sx={imageCircle} />
    </IconButton>
  );
};
