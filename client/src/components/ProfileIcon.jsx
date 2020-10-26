/** @jsx jsx */
import { jsx, Image, IconButton, Box } from "theme-ui";
import { Link } from "./index";
import profileImg from "../svg/profile.png";
// import profileImg from "../svg/DocumentPreview.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectAvatar,
  updateAvatar,
  selectAuthLoading,
  selectAuthError,
  resetErrors,
} from "../store";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, Icon, Dropdown, Form } from "semantic-ui-react";
import { ChooseMedia } from "./Media";
// import { selectMediaByUsername } from "../store/combinedSelectors";
import { selectMediaUrl } from "../store/slices/media";
// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

const hashCode = s =>
  s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

export const ProfileImage = ({ userId, profile }) => {
  console.log("profile", userId, profile);
  const tint =
    profile === undefined && userId !== undefined ? hashCode(userId) : 0;
  return (
    // <AspectRatio ratio={1 / 1}>
    <Image
      src={profile ? profile : profileImg}
      // variant="avatar"
      sx={{
        width: "100%",
        filter: `hue-rotate(${tint}deg)`,
        borderRadius: "50%",
        clipPath: "circle(100%)",
        objectFit: "cover",
      }}
    />
    // </AspectRatio>
  );
};

export const ProfileIcon = props => {
  const { userId, profile } = props;
  return (
    <IconButton {...props} as={Link} sx={{ width: 40, height: 40 }}>
      <ProfileImage userId={userId} profile={profile} />
    </IconButton>
  );
};

export const ProfileWithName = props => {
  return (
    <React.Fragment>
      <ProfileIcon {...props} to="#" sx={{ mr: "5px" }} />
      {props.userId}
    </React.Fragment>
  );
};

export const ProfileDropdown = props => {
  const user = useSelector(selectUser);
  const avatar = useSelector(selectAvatar);
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
        trigger={<ProfileWithName userId={user.username} profile={avatar} />}
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
          // marginBottom: "-3em",
          width: "30%",
          maxWidth: "250px",
          maxHeight: "250px",
          // height: "30vw",
          // maxWidth: "250px",
          // borderRadius: "50%",
        }}
      >
        <ProfileImage userId={username} profile={profile} />
      </Box>
    );

  return <ChooseProfileModal username={username} profile={profile} />;
};

export const ChooseProfileModal = ({ username, profile }) => {
  const [status, setStatus] = useState("closed");
  const [profileId, setProfileId] = useState(null);
  const profileSrc = useSelector(state => selectMediaUrl(state, profileId));
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const dispatch = useDispatch();
  const onChange = value => {
    setProfileId(value);
  };

  const closeModal = () => {
    setStatus("closed");
    setProfileId(null);
  };

  // handle loading
  useEffect(() => {
    if (loading && status === "sentSubmit") {
      setStatus("submitting");
    }
  }, [loading, status, setStatus]);

  useEffect(() => {
    if (!loading && status === "submitting") {
      if (error === null) {
        setStatus("closed");
      }
      dispatch(resetErrors());
    }
  }, [loading, status, dispatch, error]);

  const handleSubmit = e => {
    e.preventDefault();
    if (profile === profileId) {
      return;
    }
    dispatch(updateAvatar(profileId));
    setStatus("sentSubmit");
    // closeModal();
  };

  return (
    <Modal
      as={Form}
      closeIcon
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => closeModal()}
      onOpen={() => setStatus("open")}
      dimmer={{ inverted: true }}
      open={status !== "closed"}
      trigger={
        <Box
          onClick={() => setStatus("open")}
          sx={{
            margin: "auto",
            transition: ".3s ease",
            borderRadius: "50%",
            width: "calc(30% + 250px)",
            maxWidth: "250px",
            maxHeight: "250px",
            "&:hover": {
              transform: "scale(1.05)",
            },
            "&:active": {
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
        <ProfileImage userId={username} profile={profileSrc || profile} />
        <ChooseMedia
          onChange={onChange}
          value={profileId}
          placeholder="choose new profile picture"
          name="profile"
          description="Profile pic"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => closeModal()} type="button">
          <Icon name="cancel" /> Cancel
        </Button>
        <Button color="green" type="submit" loading={loading}>
          <Icon name="checkmark" /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
