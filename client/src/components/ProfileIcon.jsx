/** @jsx jsx */
import { jsx, Image, IconButton, Box } from "theme-ui";
import { Link } from "./index";
import profileImg from "../svg/profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { selectMediaById, selectUser, updateAvatar } from "../store";
import React from "react";
import { useState } from "react";
import {
  Modal,
  Button,
  Icon,
  Dropdown,
  Form,
  Divider,
} from "semantic-ui-react";
import { ChooseMedia, UploadMediaModal } from "./Media";
import { selectMediaByUsername } from "../store/combinedSelectors";
import { selectMediaUrl } from "../store/slices/media";
// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const ProfileImage = ({ userId, profile }) => {
  const tint = profile ? 0 : userId ? hashCode(userId) : 0;
  return (
    <Image
      src={profile ? profile : profileImg}
      // variant="avatar"
      sx={{
        filter: `hue-rotate(${tint}deg)`,
        borderRadius: "50%",
      }}
    />
  );
};

export const ProfileIcon = props => {
  return (
    <IconButton {...props} as={Link} sx={{ width: 40, height: 40 }}>
      <ProfileImage />
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
            selected: false,
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

export const EditableUserProfile = ({ editing, username, profile }) => {
  if (!editing)
    return (
      <Box
        sx={{
          margin: "auto",
          width: "30%",
          borderRadius: "50%",
        }}
      >
        <ProfileImage userId={username} profile={profile} />
      </Box>
    );

  return <ChooseProfileModal username={username} profile={profile} />;
};

const ChooseProfileModal = ({ username, profile }) => {
  const [open, setOpen] = useState(false);
  const [profileId, setProfileId] = useState(profile);
  const profileSrc = useSelector(state => selectMediaUrl(state, profileId));

  const dispatch = useDispatch();
  const onChange = value => {
    setProfileId(value);
  };

  const closeModal = () => {
    setOpen(false);
    setProfileId(profile);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (profile === profileId) {
      return;
    }
    dispatch(updateAvatar(profileId));
    closeModal();
  };

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => closeModal()}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: true }}
      open={open}
      trigger={
        <Box
          onClick={() => setOpen(true)}
          sx={{
            margin: "auto",
            transition: ".3s ease",
            width: "30%",
            borderRadius: "50%",
            marginBottom: "-3em",
            "&:hover": {
              filter: "brightness(120%)",
            },
            "&:active": {
              filter: "brightness(100%)",
              transform: "scale(0.9)",
            },
          }}
        >
          <ProfileImage userId={username} profile={profile} />
          <Box sx={{ transform: "translate(40%,-150%)" }}>
            <Button circular primary icon="edit" size="massive" />
          </Box>
        </Box>
      }
    >
      <Modal.Header>Choose Avatar</Modal.Header>
      <Modal.Content>
        <ProfileImage userId={username} profile={profileSrc} />
        <ChooseMedia
          onChange={onChange}
          value={profileId}
          placeholder="choose new profile picture"
          name="profile"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => closeModal()} type="button">
          <Icon name="cancel" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
