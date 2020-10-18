/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import { Button, Checkbox, Form, Icon, List } from "semantic-ui-react";
import { FormProvider } from "react-hook-form";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";

export const NewMedia = () => {
  return (
    <React.Fragment>
      <Form.Input label="Upload Media" type="file" name="media" />
      <Form.Input
        label="Media Description"
        name="description"
        control="textarea"
      />
    </React.Fragment>
  );
};

const filetypes = {
  pdf: "file pdf",
  image: "file image",
};

export const MediaItem = ({ url, description, type, filename, id }) => {
  const icon = filetypes[type] || "file";

  return (
    <List.Item key={id}>
      <List.Icon name={icon} size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header as="a">{description}</List.Header>
        <List.Description as="a">{url}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export const MediaList = () => {
  return (
    <List divided relaxed sx={{ textAlign: "left" }}>
      <MediaItem type="pdf" />
      <MediaItem type="image" />
    </List>
  );
};

export const MediaSelector = ({ url, description, type, filename, id }) => {
  return (
    <Controller as={Form.Checkbox} name={id}>
      <MediaItem />
    </Controller>
  );
};

const sampleMedia = [
  {
    url:
      "https://www.mdpi.com/animals/animals-10-00780/article_deploy/html/images/animals-10-00780-g006-550.jpg",
    description: "a camel",
    filename: "camel.png",
    type: "image",
    id: 1,
  },
];

export const ChooseMedia = ({ media = sampleMedia }) => {
  const options = media.map(item => {
    return {
      key: media.id,
      value: media.id,
      text: media.description,
      icon: filetypes[media.type] || "file",
    };
  });

  const renderLabel = label => ({
    color: "blue",
    content: label.text,
    icon: label.icon,
    onClick: () => console.log("clicked ", label.id),
  });

  return (
    <Dropdown
      multiple
      selection
      fluid
      options={options}
      placeholder="Add media"
      renderLabel={renderLabel}
      divided
      relaxed
      sx={{ textAlign: "left" }}
    >
      <UploadMedia />
      {media.map(item => {
        console.log(item);
        return <MediaItem {...item} />;
      })}
    </Dropdown>
  );
};

const UploadMedia = () => {
  const choosing = useState(false);

  return (
    <Button icon small labelPosition="left">
      <Icon name="file" />
      Upload Media
    </Button>
  );
};

export const Media = () => {
  return (
    <React.Fragment>
      <UploadMedia />
      <MediaList />
    </React.Fragment>
  );
};
