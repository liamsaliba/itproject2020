/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";

import { Button, Form, Icon, List } from "semantic-ui-react";
import { FormProvider } from "react-hook-form";
import { Modal } from "semantic-ui-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "semantic-ui-react";
import { useDispatch } from "react-redux";
// import { uploadMedia } from "../store/middleware/mediaUpload";
import { uploadMedia, selectToken } from "../store";
import { useSelector } from "react-redux";
import { selectUserMedia } from "../store/combinedSelectors";
import { selectMediaByUsername } from "../store/combinedSelectors";

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
  const media = useSelector(state => selectMediaByUsername(state, "liam"));
  // const media = useSelector(state => selectUserMedia(state));
  console.log(media);
  return (
    <List divided relaxed sx={{ textAlign: "left" }}>
      {media.map(item => (
        <MediaItem {...item} key={item.id} />
      ))}
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

export const ChooseMedia = () => {
  const media = useSelector(selectUserMedia);
  console.log(media);

  const options = media.map(item => {
    return {
      key: item.id,
      value: item.id,
      text: item.description,
      icon: filetypes[item.type] || "file",
      props: item,
    };
  });

  const renderLabel = label => ({
    color: "blue",
    content: label.text,
    icon: label.icon,
    onClick: () => console.log("clicked ", label.value),
  });

  return (
    <Form.Group widths="equal">
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
      <UploadMedia />
    </Form.Group>
  );
};

const UploadMedia = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    image_file: null,
    image_preview: "",
    description: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e, values) => {
    const { name, value } = values;
    setState({ ...state, [name]: value });
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
    console.log(state);
    dispatch(uploadMedia(state.image_file, state.description));
    // uploadMedia(dispatch)(token, state.image_file, state.description);
    setOpen(false);
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
      onClose={() => setOpen(false)}
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
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
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
      <UploadMedia />
      <MediaList />
    </React.Fragment>
  );
};
