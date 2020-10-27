/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";

import {
  Button,
  Form,
  Icon,
  List,
  Popup,
  Modal,
  Header,
} from "semantic-ui-react";
import { Controller } from "react-hook-form";
import { Dropdown, Divider } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadMedia,
  selectUserMedia,
  selectMediaByUsername,
  selectUsername,
  deleteMedia,
  getMedia,
  selectMediaLoading,
} from "../store";
import PreviewModal from "./DocumentPreview";
import { DeleteConfirmationModal } from "./Modals";
import { Image } from "semantic-ui-react";

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

  const show = () => showPreview(src, setPreview);

  return (
    <List.Item key={id.toString()}>
      <List.Content floated="right">
        <Button.Group>
          <Button icon="eye" onClick={show} />
          <DeleteConfirmationModal
            action={() => dispatch(deleteMedia(id))}
            content={<Image src={src} fluid />}
            name={description}
          />
        </Button.Group>
      </List.Content>
      <Icon name={icon} size="large" onClick={show} />
      <List.Content key={id} onClick={show}>
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

  const previewModal = (
    <PreviewModal {...preview} setClosed={() => setPreview(previewDefault)} />
  );

  return (
    <List divided relaxed selection sx={{ textAlign: "left" }}>
      {media.length === 0
        ? "No media uploaded."
        : media.map(item => (
            <MediaItem {...item} key={item.id} setPreview={setPreview} />
          ))}
      {previewModal}
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
  const loading = useSelector(selectMediaLoading);
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
            loading={loading}
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

export const UploadMediaModal = ({
  buttonText = "Upload",
  description = "",
}) => {
  const [status, setStatus] = useState("closed");
  const [state, setState] = useState(mediaEmpty);
  const dispatch = useDispatch();
  const loading = useSelector(selectMediaLoading);

  useEffect(() => {
    dispatch(getMedia());
  }, [dispatch]);

  useEffect(() => {
    if (loading && status === "startUploading") {
      setStatus("uploading");
    }
  }, [loading, status, setStatus]);

  useEffect(() => {
    if (!loading && status === "uploading") {
      setStatus("closed");
    }
  }, [loading, status, setStatus]);

  const handleChange = (e, values) => {
    const { name, value } = values;
    setState({ ...state, [name]: value });
  };

  const closeModal = () => {
    setStatus("closed");
    setState(mediaEmpty);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (status !== "open") return;
    if (state.image_file === null) {
      // todo: display error
      return;
    }
    if (state.description === "") {
      // todo: display error
      return;
    }
    setStatus("startUploading");
    dispatch(uploadMedia(state.image_file, state.description));
    // uploadMedia(dispatch)(token, state.image_file, state.description);
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
      onClose={closeModal}
      onOpen={() => setStatus("open")}
      dimmer={{ inverted: true }}
      open={status !== "closed"}
      trigger={
        <Button icon type="button" labelPosition="left">
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
          defaultValue={description}
          required
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={closeModal} type="button">
          <Icon name="cancel" /> Cancel
        </Button>
        <Button
          color="green"
          type="button"
          loading={loading}
          onClick={handleSubmit}
        >
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
        View your uploaded media here. <Icon name="hand point down" />
      </p>
      <MediaList />
    </React.Fragment>
  );
};
