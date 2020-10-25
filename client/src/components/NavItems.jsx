/** @jsx jsx */
import {
  jsx,
  Image,
  IconButton,
  NavLink as StyledNavLink,
  Button as TButton,
} from "theme-ui";
import { Button as SButton, Icon } from "semantic-ui-react";
import { NavHashLink, HashLink } from "react-router-hash-link";
import isAbsoluteURL from "is-absolute-url";
import camel from "../svg/camel.svg";

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

export const Dot = () => (
  <Icon
    color="red"
    name="circle"
    size="mini"
    sx={{ top: "28px", position: "fixed", verticalAlign: "top" }}
  />
);

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
    {props.important && <Dot />}
  </StyledNavLink>
);

export const SemanticButton = props => (
  <SButton {...props} as={Link} variant="nav" m={2} p={2}>
    {props.children}
  </SButton>
);

export const ThemeButton = props => (
  <TButton {...props} as={Link} variant="nav" m={2} p={2}>
    {props.children}
  </TButton>
);
export const MenuButton = SemanticButton;

export const MenuImage = props => {
  // Add default value for props.round!
  const imageCircle = props.round ? { borderRadius: "50%" } : {};

  return (
    <IconButton as={Link} {...props} sx={{ width: 48, height: 48 }}>
      <Image
        src={props.src}
        sx={{ ...props.sx, ...imageCircle, width: 48, height: 48 }}
      />
    </IconButton>
  );
};

export const MenuCamel = () => <MenuImage src={camel} to="/" />;

export const SidebarImage = props => {
  const imageCircle = props.round ? { borderRadius: "50%" } : {};

  return (
    <IconButton {...props} sx={{ width: 48, height: 48 }}>
      <Image
        src={props.src}
        sx={{ ...props.sx, ...imageCircle, width: 48, height: 48 }}
      />
    </IconButton>
  );
};

export const SidebarCamel = () => <SidebarImage src={camel} />;
