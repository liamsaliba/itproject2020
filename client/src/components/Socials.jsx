/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import React, { useState } from "react";

import { SocialIcon } from "./SocialIcon";
import { Popup, Button, Form } from "semantic-ui-react";
import { useEffectUpdate } from "../helpers";

const EditSocial = ({ url, update, del }) => {
  const [name, setName] = useState(url);

  return (
    <Form.Input
      icon={"linkify"}
      iconPosition="left"
      placeholder="http://yoururlhere.com"
      onChange={(e, { value }) => setName(value)}
      value={name}
      autoFocus
      action={
        <React.Fragment>
          <Button
            icon="checkmark"
            type="button"
            positive
            onClick={() => {
              update(name);
            }}
          />
          <Button icon="trash" basic color="red" onClick={del} />
        </React.Fragment>
      }
    />
  );
};

export const EditableSocialIcon = ({
  url,
  update,
  del,
  startOpened = false,
  onClosed = () => null,
}) => {
  const [thisEditing, setThisEditing] = useState(startOpened);
  return (
    <Popup
      trigger={<SocialIcon url={url} disabled />}
      content={
        <EditSocial
          url={url}
          update={newUrl => {
            update(newUrl);
            setThisEditing(false);
          }}
          del={() => {
            del();
            setThisEditing(false);
          }}
        />
      }
      style={{ padding: 0 }}
      on="click"
      open={thisEditing}
      onClose={() => {
        setThisEditing(false);
        onClosed();
      }}
      onOpen={() => setThisEditing(true)}
      wide="very"
      position="bottom center"
    />
  );
};

export const CustomSocialIcon = ({
  url,
  editing = false,
  update,
  del,
  onClosed,
  startOpened = false,
}) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        mr: "0.5em",
        transition: ".3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "&:active": {
          transform: "scale(0.9)",
        },
      }}
    >
      {editing ? (
        <EditableSocialIcon
          url={url}
          update={update}
          del={del}
          onClosed={onClosed}
          startOpened={startOpened}
        />
      ) : (
        <SocialIcon url={url} />
      )}
    </Box>
  );
};

const remove = (arr, idx) => [...arr.slice(0, idx), ...arr.slice(idx + 1)];

const replace = (arr, elem, idx) => [
  ...arr.slice(0, idx),
  elem,
  ...arr.slice(idx + 1),
];

export const SocialIcons = ({
  socials: oldSocials,
  editing = false,
  update = () => null,
}) => {
  const [socials, setSocials] = useState(oldSocials);
  const [created, setCreated] = useState(false);

  useEffectUpdate(() => {
    update(socials);
  }, [socials]);

  const createSocial = () => {
    setSocials([...socials, ""]);
  };

  const updateSocial = idx => url => {
    if (idx === undefined) {
      setSocials([...socials, url]);
    } else {
      setSocials(replace(socials, url, idx));
    }
  };

  const deleteSocial = idx => () => {
    setSocials(remove(socials, idx));
    setCreated(false);
  };

  return (
    <Box>
      {socials
        ? socials.map((social, idx) => (
            <CustomSocialIcon
              key={"social" + idx}
              url={social}
              editing={editing}
              update={updateSocial(idx)}
              del={deleteSocial(idx)}
              onClosed={() => setCreated(false)}
              startOpened={idx === socials.length - 1 && created}
            />
          ))
        : null}
      {editing ? (
        <Button
          circular
          icon="plus"
          size="huge"
          onClick={() => {
            if (socials.length === 0 || socials[socials.length - 1] !== "") {
              createSocial();
            }
            setCreated(true);
          }}
          {...(socials.length === 0 ? { label: "Add social icon" } : {})}
        />
      ) : null}
    </Box>
  );
};

export default SocialIcons;
