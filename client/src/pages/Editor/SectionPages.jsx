/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Section from "./Section";

import { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  List,
  Dropdown,
  Form,
  Input,
  Divider,
  Loader,
} from "semantic-ui-react";
import {
  selectUsername,
  selectPortfolioPages,
  createPage,
  renamePage,
  deletePage,
} from "../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { artifactTypeToName } from "../../components/Artifact";

const Page = ({ active, setActive, page }) => {
  const dispatch = useDispatch();

  const { name, pageId, loading } = page;

  const handlePageClick = e => {
    setActive(page);
  };

  return (
    <List.Item
      name={name}
      key={pageId.toString()}
      onClick={handlePageClick}
      fluid
      sx={{ overflowWrap: "break-word" }}
    >
      <List.Content floated="right">
        <Dropdown
          floating
          inline
          direction="left"
          icon="caret square down"
          sx={{ p: "0.2em" }}
        >
          <Dropdown.Menu>
            <RenamePageModal pageState={{ name, pageId }} />
            <DeleteConfirmationModal
              action={() => dispatch(deletePage(pageId))}
              name={name}
            />
          </Dropdown.Menu>
        </Dropdown>
      </List.Content>
      <Loader inline size="large" active={loading} />
      <List.Header>{name}</List.Header>
    </List.Item>
  );
};

const DeleteConfirmationModal = ({ setParentOpen, action, name = "this" }) => {
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
        <Dropdown.Item>
          <Icon name="trash" />
          Delete
        </Dropdown.Item>
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

const RenamePageModal = ({ pageState }) => {
  const { name, pageId } = pageState;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ name });
  const dispatch = useDispatch();
  const handleChange = (e, { name, value }) =>
    setState({ ...state, [name]: value });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(renamePage(pageId, state.name));
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
  const options = [
    { key: "x", text: "Experience", value: "experience" },
    { key: "e", text: "Education", value: "education" },
    { key: "d", text: "Display", value: "display" },
    { key: "d", text: "Custom", value: "custom" },
  ];
  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) => {
    if (
      name === "type" &&
      ["Experience", "Education", "Display", "Custom", ""].includes(state.name)
    ) {
      setState({ ...state, name: artifactTypeToName(value), type: value });
    } else {
      // do it this way -- setState is async
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(state);
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
      <Modal.Header>Create new page</Modal.Header>
      <Modal.Content>
        <Modal.Description sx={{ minHeight: "150px", overflow: "visible" }}>
          <Form.Input
            fluid
            iconPosition="left"
            icon="file"
            label="Page Name"
            placeholder="Page Name"
            name="name"
            onChange={handleChange}
            value={state.name}
            size="big"
            required
          />
          <Form.Select
            fluid
            required
            label="Type"
            options={options}
            placeholder="Type"
            onChange={handleChange}
            value={state.type}
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
  const pages = useSelector(state => selectPortfolioPages(state, username));
  // eslint-disable-next-line
  const [activePage, setActive] = useState("Home");
  // activePage === page

  return (
    <Section name="Pages" icon="file text">
      <NewPageModal />
      <Divider />
      <p>Manage your pages...</p>
      <Flex sx={{ justifyContent: "center", flexDirection: "column" }}>
        {pages.length === 0 ? (
          "No pages, care to make a new one?"
        ) : (
          // replace with https://react.semantic-ui.com/elements/list/#types-divided
          <List divided relaxed selection sx={{ textAlign: "left" }}>
            {pages.map(page => (
              <Page
                key={page.pageId.toString()}
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
