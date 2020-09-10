/** @jsx jsx */
import { jsx, Button, NavLink, Image, IconButton } from "theme-ui";
import { Link } from "./index";
import isAbsoluteURL from "is-absolute-url";
import profileImg from "../svg/profile.webp";

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const Profile = props => {
  const tint = hashCode(props.userId);
  console.log(tint);
  return (
    <IconButton {...props} as={Link} variant="logo">
      <Image
        src={profileImg}
        variant="logo"
        sx={{ ...props.sx, filter: `hue-rotate(${tint}deg)` }}
      />
    </IconButton>
  );
};
