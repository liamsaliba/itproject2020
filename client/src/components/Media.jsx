/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import { Button, Form, Icon, List, Popup } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { uploadMedia } from "../store";
import { useSelector } from "react-redux";
import { selectUserMedia } from "../store/combinedSelectors";
import { selectMediaByUsername } from "../store/combinedSelectors";
import { selectUsername } from "../store/slices/auth";
import PreviewModal from "./DocumentPreview";

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

const previewDefault = { open: false, src: "" };
const showPreview = (src, setPreview) => setPreview({ open: true, src });

export const MediaItem = ({
  url,
  description,
  type,
  filename,
  id,
  setPreview,
}) => {
  const icon = filetypes[type] || "file";
  const src = url;

  return (
    <List.Item key={id} onClick={() => showPreview(src, setPreview)}>
      <List.Icon name={icon} size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header as="a">{description}</List.Header>
        <List.Description as="a">{url}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export const MediaList = () => {
  const username = useSelector(state => selectUsername(state));
  const media = useSelector(state => selectMediaByUsername(state, username));
  const [preview, setPreview] = useState({ open: false, src: "" });

  return (
    <List divided relaxed selection sx={{ textAlign: "left" }}>
      {media.map(item => (
        <MediaItem {...item} key={item.id} setPreview={setPreview} />
      ))}
      <PreviewModal {...preview} setClosed={() => setPreview(previewDefault)} />
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

export const ChooseMedia = () => {
  const media = useSelector(selectUserMedia);
  const [preview, setPreview] = useState(previewDefault);

  const options = media.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item.description,
      icon: filetypes[item.type] || "file",
      src: item.url,
    };
  });

  const renderLabel = label => ({
    color: "blue",
    content: label.text,
    icon: label.icon,
    onClick: () => showPreview(label.src, setPreview),
  });

  return (
    <Form.Group widths="equal">
      <Popup
        trigger={
          <Dropdown
            action={{
              color: "teal",
              labelPosition: "right",
              icon: "copy",
              content: "Copy",
            }}
            multiple
            selection
            search
            fluid
            options={options}
            placeholder="Add media"
            renderLabel={renderLabel}
            divided
            relaxed
            sx={{ textAlign: "left" }}
          />
        }
        header="Choosing files"
        content="Click on a file badge to preview that file!"
        on={["hover"]}
      />
      <UploadMediaModal />
      <PreviewModal {...preview} setClosed={() => setPreview(previewDefault)} />
    </Form.Group>
  );
};

const mediaEmpty = {
  image_file: null,
  image_preview: "",
  description: "",
};

const UploadMediaModal = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(mediaEmpty);
  const dispatch = useDispatch();
  const handleChange = (e, values) => {
    const { name, value } = values;
    setState({ ...state, [name]: value });
  };

  const closeModal = () => {
    setOpen(false);
    setState(mediaEmpty);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.image_file === null) {
      // todo: display error
      return;
    }
    if (state.description === "") {
      // todo: display error
      return;
    }
    dispatch(uploadMedia(state.image_file, state.description));
    // uploadMedia(dispatch)(token, state.image_file, state.description);
    closeModal();
  };

  const handleImagePreview = e => {
    const file = e.target.files[0];
    const base64 = URL.createObjectURL(file);

    setState({
      image_preview: base64,
      image_file: file,
    });
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
        <Button icon small labelPosition="left">
          <Icon name="upload" />
          Upload
        </Button>
      }
    >
      <Modal.Header>Upload Media</Modal.Header>
      <Modal.Content>
        {state.image_preview ? (
          <img
            src={state.image_preview}
            alt="preview"
            sx={{ maxWidth: "100%" }}
          />
        ) : null}
        <Form.Input
          fluid
          placeholder="A bird, a plane, a turkey sandwich"
          label="Description"
          name="description"
          onChange={handleChange}
          defaultValue={""}
          required
        />
        <Form.Input
          label="Upload File"
          name="file"
          onChange={handleImagePreview}
          required
          type="file"
          accept="image/jpg,image/bmp,image/png"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => closeModal()} type="button">
          <Icon name="cancel" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="upload" /> Upload
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export const Media = () => {
  return (
    <React.Fragment>
      <UploadMediaModal />
      <MediaList />
    </React.Fragment>
  );
};
