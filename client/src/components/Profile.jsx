/** @jsx jsx */
import { jsx, Image, IconButton } from "theme-ui";
import { Link } from "./index";
import profileImg from "../svg/profile.webp";

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const Profile = props => {
  const tint = hashCode(props.userId);
  console.log(tint);
  return (
    <IconButton {...props} as={Link} variant="logo" p={2}>
      <Image
        p={1}
        src={profileImg}
        variant="logo"
        sx={{ ...props.sx, filter: `hue-rotate(${tint}deg)` }}
      />
    </IconButton>
  );
};
