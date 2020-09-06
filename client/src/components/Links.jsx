/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link as ReachLink } from "@reach/router";

export const Link = props => {
  console.log(props);
  return (
    <ReachLink
      {...props}
      activeClassName="active"
      variant={props.variant}
      sx={{
        ...props.sx,
        color: "inherit",
        "&.active": {
          color: "primary",
        },
      }}
    >
      {props.children}
    </ReachLink>
  );
};

export const NavLink = props => <Link {...props} />;
