/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { useState, useEffect } from "react";

import {
  Button,
  Form,
  Icon,
  List,
  Modal,
  Header,
  Checkbox,
  Divider,
} from "semantic-ui-react";
import { Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";
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
import { EditableField } from "./Form";
import { hoverGrow } from "../helpers";

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
          <Button icon="eye" onClick={show} type="button" />
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

export const MediaImage = ({
  src,
  showPreview,
  selected = null,
  toggleSelected = null,
  size = null,
  ...rest
}) => {
  const selectable = selected !== null;
  return (
    <Box
      sx={{
        ...(selectable ? hoverGrow : null),
      }}
    >
      {/* Checkbox */}
      {selectable ? (
        <Box
          sx={{
            transform: "translate(10px,10px)",
            position: "relative",
            height: "0",
            zIndex: "1",
          }}
        >
          <Checkbox onChange={toggleSelected} checked={selected} />
        </Box>
      ) : null}
      <Box
        sx={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
        }}
        onClick={selectable ? toggleSelected : showPreview}
      >
        <Image src={src} {...rest} />
      </Box>
      {/* Preview Button */}
      <Box
        sx={{
          transform: `translate(${
            size ? size.slice(0, size.length - 2) - 45 + "px" : "80%"
          },-50px)`,
          position: "relative",
          height: "0",
        }}
      >
        <Button
          circular
          icon="expand"
          size="large"
          onClick={showPreview}
          type="button"
        />
      </Box>
    </Box>
  );
};

const Card = ({ size, children }) => {
  return (
    <Box
      sx={{
        borderRadius: 4,
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
        width: size,
        height: size,
        mr: "1em",
        mb: "1em",
      }}
      children={children}
    />
  );
};

export const MediaCard = ({
  url,
  preview,
  size,
  selected = null,
  toggleSelected = null,
}) => {
  return (
    <Card>
      <MediaImage
        size={size}
        src={url}
        // size="small"
        showPreview={() => preview(url)}
        selected={selected}
        toggleSelected={toggleSelected}
      />
    </Card>
  );
};

export const MediaCardItem = ({
  url: src,
  description,
  type,
  filename,
  id,
  setPreview,
}) => {
  const dispatch = useDispatch();
  // const icon = filetypes[type] || "file";
  const show = () => showPreview(src, setPreview);
  // {/* <DeleteConfirmationModal
  //             action={() => }
  //             content={<Image src={src} fluid />}
  //             name={description}
  //           /> */}
  return (
    <List.Item key={id.toString()}>
      <MediaImage src={src} showPreview={show} />
      <List.Content key={id}>
        <List.Description>
          <EditableField
            {...{
              id,
              value: description,
              emptyPlaceholder: filename === "" ? "no description" : filename,
              placeholder: "description",
              update: name =>
                console.log("i'll rename ", description, "to", name),
              del: () => dispatch(deleteMedia(id)),
              maxLength: "15",
            }}
          />
        </List.Description>
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
    <List divided selection sx={{ textAlign: "left" }}>
      {media.length === 0
        ? "No media uploaded."
        : media.map(item => (
            <MediaCardItem {...item} key={item.id} setPreview={setPreview} />
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

export const OldChooseMedia = ({
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
        sx={{ textAlign: "left" }}
      />
      <UploadMediaModal />
      <PreviewModal {...preview} setClosed={() => setPreview(previewDefault)} />
    </Form.Group>
  );
};

export const SelectedMediaCards = ({
  value,
  media,
  placeholder,
  loading,
  preview,
}) => {
  const subset = media.filter(item => value.includes(item.id));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {subset.map(item => (
        <MediaCard
          key={"mediacard" + item.id}
          id={item.id}
          url={item.url}
          preview={preview}
          size="140px"
        />
      ))}
      <Card size="140px">
        <Box
          sx={{
            ...hoverGrow,
          }}
          onClick={console.log("clicked!")}
        ></Box>
      </Card>
    </Box>
  );
};

export const SelectMediaCards = ({
  value, // list of media ids
  multiple = false, // do we allow multiple selection?
  loading, // loading?
  placeholder, // tip for user (what to do?)
  media, // media
  preview, // show preview
  onChange, // update parent based on this state
}) => {
  const toggle = id => () => {
    onChange(
      multiple
        ? value === null
          ? [id]
          : value.includes(id)
          ? value.filter(item => item !== id) // remove id
          : value.concat([id]) // add id
        : value === id
        ? null
        : id
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {media.map(item => (
        <MediaCard
          key={"mediacard" + item.id}
          id={item.id}
          url={item.url}
          preview={preview}
          size="140px"
          selected={
            multiple
              ? value !== null && value.includes(item.id)
              : value === item.id
          }
          toggleSelected={toggle(item.id)}
        />
      ))}
      <Card size="140px">
        <Box
          sx={{
            width: "140px",
            height: "140px",
            ...hoverGrow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => console.log("clicked!")}
        >
          <UploadMediaModal />
          {/* <Header as="h4" icon textAlign="center">
            <Icon name="upload" />
            Upload media
          </Header> */}
        </Box>
      </Card>
    </Box>
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

  return (
    <Box>
      <SelectMediaCards
        value={value}
        multiple={multiple}
        loading={loading}
        placeholder={placeholder}
        media={media}
        preview={src => showPreview(src, setPreview)}
        onChange={onChange}
      />
      <PreviewModal {...preview} setClosed={() => setPreview(previewDefault)} />
    </Box>
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
  ...props
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
        <Button
          icon="upload"
          type="button"
          labelPosition="left"
          content={buttonText}
          {...props}
        />
      }
    >
      <Modal.Header>Upload Media</Modal.Header>
      <Modal.Content>
        <Header>
          Only .jpg, .bmp, .png, .gif files are currently supported.
        </Header>
        <Form.Input
          label="Upload File"
          name="file"
          onChange={handleImagePreview}
          required
          type="file"
          accept="image/jpg,image/bmp,image/png,image/gif"
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
    <Box>
      <Divider horizontal>
        <Header as="h3">Manage Media</Header>
      </Divider>
      <UploadMediaModal buttonText="Upload Media" primary fluid />
      <MediaList />
    </Box>
  );
};
