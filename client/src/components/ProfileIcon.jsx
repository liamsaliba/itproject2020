/** @jsx jsx */
import { jsx, Image, IconButton } from "theme-ui";
import { Link } from "./index";
import profileImg from "../svg/profile.webp";

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const ProfileIcon = props => {
  const tint = props.userId ? hashCode(props.userId) : 0;
  return (
    <IconButton {...props} as={Link} sx={{ width: 48, height: 48 }}>
      <Image
        src={profileImg}
        // variant="avatar"
        sx={{
          ...props.sx,
          filter: `hue-rotate(${tint}deg)`,
        }}
      />
    </IconButton>
  );
};
