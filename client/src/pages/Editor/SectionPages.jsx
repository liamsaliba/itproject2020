/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Section from "./Section";

import React, { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  List,
  Dropdown,
  Form,
  Input,
  Divider,
  Header,
  Checkbox,
} from "semantic-ui-react";
import {
  selectUsername,
  selectPagesByUsername,
  createPage,
  renamePage,
  deletePage,
  selectCurrentUserPortfolio,
  updateAllowContact,
  updateSinglePage,
} from "../../store";
import { useSelector, useDispatch } from "react-redux";

/** @jsx jsx */
import { isTrue } from "../../helpers";

const pageTypes = {
  mixed: { key: "m", text: "Mix", value: "mix", icon: "mix" },
  experience: {
    key: "x",
    text: "Experience",
    defaultPageName: "Experience",
    value: "experience",
    icon: "briefcase",
  },
  education: {
    key: "e",
    text: "Education",
    defaultPageName: "Education",
    value: "education",
    icon: "graduation",
  },
  display: {
    key: "d",
    text: "Display",
    value: "display",
    icon: "newspaper outline",
  },
  gallery: { key: "g", text: "Gallery", value: "gallery", icon: "images" },
  article: {
    key: "a",
    text: "Article",
    defaultPageName: "Articles",
    value: "article",
    icon: "file alternate outline",
  },
  publication: {
    key: "p",
    text: "Publication",
    defaultPageName: "Publications",
    value: "publication",
    icon: "book",
  },
  talk: {
    key: "t",
    text: "Talk",
    defaultPageName: "Talks",
    value: "talk",
    icon: "talk",
  },
  custom: {
    key: "c",
    defaultPageName: "",
    text: "Custom",
    value: "custom",
    icon: "newspaper outline",
  },
};

const Toggle = ({ value, setValue, icon, label }) => {
  const onChange = (_, { checked }) => {
    // set to the new value of checked
    setValue(checked.toString());
  };

  return (
    <Checkbox
      toggle
      onChange={onChange}
      checked={isTrue(value)}
      label={
        <label>
          {icon ? <Icon name={icon} /> : null}
          {label}
        </label>
      }
    />
  );
};

const PageSettings = () => {
  const dispatch = useDispatch();
  const singlePage = useSelector(
    state => selectCurrentUserPortfolio(state).singlePage
  );
  const contact = useSelector(
    state => selectCurrentUserPortfolio(state).allowContact
  );

  return (
    <div
      sx={{
        "& div": {
          mb: "0.5em",
        },
      }}
    >
      <div sx={{ textAlign: "left" }}>
        <Toggle
          label="Contact form"
          icon="address book"
          value={contact}
          setValue={value => dispatch(updateAllowContact(value))}
        />
      </div>
      <div sx={{ textAlign: "left" }}>
        <Toggle
          label="Single page portfolio"
          icon="file"
          value={singlePage}
          setValue={value => dispatch(updateSinglePage(value))}
        />
      </div>
    </div>
  );
};

const Page = ({ active, setActive, page }) => {
  const dispatch = useDispatch();
  const { name: oldName, id, loading, type } = page;
  const [name, setName] = useState(oldName);

  const [editing, setEditing] = useState(false);
  const typeInfo = pageTypes[type];
  const icon = typeInfo === undefined ? "file outline" : typeInfo.icon;

  const handlePageClick = e => {
    console.log(page);
    setActive(page);
  };

  return (
    <List.Item
      name={name}
      key={id.toString()}
      onClick={handlePageClick}
      fluid
      sx={{ overflowWrap: "break-word" }}
    >
      {/* <List.Content floated="right">
        <Dropdown
          floating
          direction="left"
          icon="caret square down"
          sx={{ p: "0.2em" }}
          open={status === "open"}
          onClose={() => setStatus("idle")}
          onClick={() => setStatus("open")}
        >
          <Dropdown.Menu>
            <RenamePageModal pageState={{ name, id }} />
            <DeleteConfirmationModal
              action={() => dispatch(deletePage(id))}
              name={name}
            />
          </Dropdown.Menu>
        </Dropdown>
      </List.Content> */}
      {/* <List.Icon name="file outline" /> */}
      <List.Content
      // onClick={() => setStatus("open")}
      >
        <Form.Input
          name={id}
          loading={loading}
          maxLength="15"
          fluid
          icon={icon}
          iconPosition="left"
          onChange={(e, { value }) => setName(value)}
          value={name}
          transparent={!editing}
          readOnly={!editing}
          action={
            editing ? (
              <React.Fragment>
                <Button
                  icon="cancel"
                  type="button"
                  negative
                  onClick={() => {
                    setName(oldName);
                    setEditing(false);
                  }}
                />
                <Button
                  icon="checkmark"
                  type="button"
                  positive
                  onClick={() => {
                    dispatch(renamePage(id, name));
                    setEditing(false);
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  icon="pencil"
                  type="button"
                  onClick={() => setEditing(true)}
                />
                <DeleteConfirmationModal
                  action={() => dispatch(deletePage(id))}
                  name={name}
                />
              </React.Fragment>
            )
          }
        />
        {/* <List.Header>{name}</List.Header> */}
      </List.Content>
    </List.Item>
  );
};

export const DeleteConfirmationModal = ({
  setParentOpen,
  action,
  name = "this",
  button = false,
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
      trigger={
        <Button basic icon="trash" color="red" onClick={() => setOpen(true)} />
      }
    >
      <Modal.Header>
        Are you sure you want to delete {name}? This process is irreversible.
      </Modal.Header>
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

// eslint-disable-next-line no-unused-vars
const RenamePageModal = ({ pageState }) => {
  const { name, id } = pageState;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ name });
  const dispatch = useDispatch();
  const handleChange = (e, { name, value }) =>
    setState({ ...state, [name]: value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(renamePage(id, state.name));
    setOpen(false);
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
        <Dropdown.Item>
          <Icon name="i cursor" />
          Rename
        </Dropdown.Item>
      }
    >
      <Modal.Header>Edit page name</Modal.Header>
      <Modal.Content>
        <Input
          transparent
          fluid
          iconPosition="left"
          icon="file"
          placeholder="Page Name"
          name="name"
          onChange={handleChange}
          defaultValue={name}
          required
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="checkmark" /> Rename Page
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export const NewPageModal = () => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [state, setState] = useState({ name: "", type: "display" });

  const options = Object.values(pageTypes);
  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) => {
    if (
      name === "type" &&
      ([
        "Experience",
        "Education",
        "Publications",
        "Talks",
        "Articles",
        "Gallery",
      ].includes(state.name) ||
        state.name === "")
    ) {
      setState({
        ...state,
        name: pageTypes[value] ? pageTypes[value].defaultPageName : "",
        type: value,
      });
    } else {
      // do it this way -- setState is async
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPage(state));
    setOpen(false);
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
        <Button icon primary labelPosition="left">
          <Icon name="add" />
          Create Page
        </Button>
      }
    >
      <Modal.Header>
        <Icon name="file" />
        Create new page
      </Modal.Header>
      <Modal.Content>
        <Modal.Description sx={{ minHeight: "150px", overflow: "visible" }}>
          <Form.Input
            fluid
            icon={pageTypes[state.type] ? pageTypes[state.type].icon : "file"}
            iconPosition="left"
            maxLength="15"
            label="Page Name"
            placeholder="Page Name"
            name="name"
            onChange={handleChange}
            value={state.name}
            size="large"
            required
          />
          <Form.Select
            fluid
            icon
            required
            label="Type"
            options={options}
            placeholder="Type"
            onChange={handleChange}
            value={state.type}
            size="big"
            name="type"
            // sx={{ zIndex: "999999 !important" }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" type="submit">
          <Icon name="checkmark" /> Create Page
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const SectionPages = () => {
  const username = useSelector(selectUsername);
  const pages = useSelector(state => selectPagesByUsername(state, username));
  // eslint-disable-next-line
  const [activePage, setActive] = useState("Home");
  // activePage === page

  return (
    <Section name="Pages" icon="file text">
      <Header>Manage pages</Header>
      <PageSettings />
      <Divider />
      <NewPageModal />
      <Flex
        sx={{ justifyContent: "center", flexDirection: "column", mt: "1em" }}
      >
        {pages.length === 0 ? (
          "No pages, care to make a new one?"
        ) : (
          // replace with https://react.semantic-ui.com/elements/list/#types-divided
          <List divided relaxed selection sx={{ textAlign: "left" }}>
            {pages.map(page => (
              <Page
                key={page.id.toString()}
                page={page}
                active={true}
                setActive={setActive}
              />
            ))}
          </List>
        )}
      </Flex>
    </Section>
  );
};

export default SectionPages;
