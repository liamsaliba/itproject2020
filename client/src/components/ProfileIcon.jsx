/** @jsx jsx */
import { jsx, Image, IconButton } from "theme-ui";
import { Link } from "./index";
import profileImg from "../svg/profile.webp";
import { useSelector } from "react-redux";
import { selectUser } from "../store";
import { Dropdown } from "semantic-ui-react";
import React from "react";

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const ProfileIcon = props => {
  const tint = props.userId ? hashCode(props.userId) : 0;
  const w = props.width ? props.width : 40;
  const h = props.height ? props.height : 40;
  return (
    <IconButton {...props} as={Link} sx={{ width: w, height: h }}>
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

export const ProfileWithName = props => {
  return (
    <React.Fragment>
      <ProfileIcon userId={props.userId} to="#" sx={{ mr: "5px" }} />
      {props.userId}
    </React.Fragment>
  );
};

export const ProfileDropdown = props => {
  const user = useSelector(selectUser);
  const options = [
    {
      key: "user",
      children: (
        <span>
          Signed in as{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </span>
      ),
      disabled: true,
    },
    ...(props.items === "default"
      ? [
          {
            key: "editor",
            icon: "edit",
            text: "Editor",
            as: Link,
            to: "/editor",
          },
          {
            key: "portfolio",
            icon: "user circle",
            text: "Portfolio",
            as: Link,
            to: `/u/${user.username}`,
          },
        ]
      : props.items || []),
    {
      key: "settings",
      icon: "settings",
      text: "Settings",
      as: Link,
      to: "/settings",
    },
    {
      key: "sign-out",
      icon: "sign out",
      text: "Logout",
      as: Link,
      to: "/logout",
    },
  ];

  return (
    <span>
      <Dropdown
        trigger={<ProfileWithName userId={user.username} />}
        pointing="top left"
        direction="left"
        floating
        inline
        options={options}
        sx={{ display: "inline-flex !important", alignItems: "center" }}
      />
    </span>
  );
};
