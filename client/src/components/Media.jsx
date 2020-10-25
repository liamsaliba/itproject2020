/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import {
  Button,
  Form,
  Icon,
  List,
  Popup,
  Modal,
  Image,
  Header,
} from "semantic-ui-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { uploadMedia } from "../store";
import { useSelector } from "react-redux";
import { selectUserMedia } from "../store/combinedSelectors";
import { selectMediaByUsername } from "../store/combinedSelectors";
import { selectUsername } from "../store/slices/auth";
import { deleteMedia } from "../store/slices/media";
import PreviewModal from "./DocumentPreview";
import { Divider } from "semantic-ui-react";

const DeleteConfirmationModal = ({
  setParentOpen,
  action,
  name = "this",
  src,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    action();
    setOpen(false);
    if (setParentOpen) setParentOpen(false);
  };

  return (
    <Modal
      as={Form}
      onSubmit={handleSubmit}
      size="tiny"
      closeOnDimmerClick={false}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer={{ inverted: true }}
      open={open}
      trigger={<Button size="mini" icon="trash" />}
    >
      <Modal.Header>
        Are you sure you want to delete {name}? This process is irreversible.
      </Modal.Header>
      <Modal.Content>
        <Image src={src} fluid />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="red" type="submit">
          <Icon name="trash" /> Delete
        </Button>
      </Modal.Actions>
    </Modal>
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
  const dispatch = useDispatch();
  const icon = filetypes[type] || "file";
  const src = url;

  return (
    <List.Item key={id.toString()} verticalAlign="middle" fluid>
      <List.Content floated="right">
        <DeleteConfirmationModal
          action={() => dispatch(deleteMedia(id))}
          name={description}
          src={src}
        />
      </List.Content>
      <Icon
        name={icon}
        size="large"
        onClick={() => showPreview(src, setPreview)}
      />
      <List.Content key={id} onClick={() => showPreview(src, setPreview)}>
        <List.Header as="a">
          {filename === "" ? description : filename}
        </List.Header>
        {filename === "" ? null : (
          <List.Description as="a">{description}</List.Description>
        )}
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
      {media.length === 0
        ? "No media uploaded."
        : media.map(item => (
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

export const ChooseMedia = ({
  onChange,
  value,
  name,
  placeholder = "add media...",
  multiple = false,
}) => {
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
            name={name}
            value={value}
            action={{
              color: "teal",
              labelPosition: "right",
              icon: "copy",
              content: "Copy",
            }}
            multiple={multiple}
            selection
            search
            fluid
            options={options}
            onChange={(e, { value }) => onChange(value)}
            placeholder={placeholder}
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

export const UploadMediaModal = ({ buttonText = "Upload" }) => {
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
    if (e.target.files.length === 0) return;
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
        <Button icon labelPosition="left">
          <Icon name="upload" />
          {buttonText}
        </Button>
      }
    >
      <Modal.Header>Upload Media</Modal.Header>
      <Modal.Content>
        <Header>Only .jpg, .bmp, .png files are currently supported.</Header>
        <Form.Input
          label="Upload File"
          name="file"
          onChange={handleImagePreview}
          required
          type="file"
          accept="image/jpg,image/bmp,image/png"
        />
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
      <UploadMediaModal buttonText="Upload new media" />
      <Divider horizontal>Or</Divider>
      <p>
        View your uploaded media here. <Icon name="hand point down" inline />
      </p>
      <MediaList />
    </React.Fragment>
  );
};
