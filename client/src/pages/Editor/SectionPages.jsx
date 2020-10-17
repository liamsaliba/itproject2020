/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Section from "./Section";

import { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  Menu,
  Grid,
  Dropdown,
  Form,
  Input,
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

const PageDropdown = ({ pageState }) => {
  return (
    <Dropdown
      right
      aligned
      floating
      inline
      direction="left"
      sx={{ p: "0.2em" }}
    >
      <Dropdown.Menu>
        <RenamePageModal pageState={pageState} />
        <DeletePageModal pageState={pageState} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Page = ({ active, setActive, page }) => {
  const { name, pageId } = page;

  const handlePageClick = e => {
    setActive(page);
  };

  return (
    <Menu.Item
      name={name}
      active={active}
      key={pageId.toString()}
      onClick={handlePageClick}
      fluid
    >
      <Grid>
        <Grid.Column floated="left" width={2} sx={{ verticalAlign: "middle" }}>
          <span>{name}</span>
        </Grid.Column>
        <Grid.Column floated="right">
          <PageDropdown pageState={{ name, pageId }} />
        </Grid.Column>
      </Grid>
    </Menu.Item>
  );
};

const DeletePageModal = ({ pageState }) => {
  const { name, pageId } = pageState;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(deletePage(pageId));
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
          <Icon name="trash" fitted /> Delete
        </Dropdown.Item>
      }
    >
      <Modal.Header>
        Are you sure you want to delete the page "{name}"? This process is
        irreversible.
      </Modal.Header>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="red" type="submit">
          <Icon name="trash" /> Delete Page
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
          <Icon name="i cursor" fitted /> Rename
        </Dropdown.Item>
      }
    >
      <Modal.Header>
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
      </Modal.Header>
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

const NewPageModal = () => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [state, setState] = useState({ name: "", type: "" });
  const options = [
    { key: "x", text: "Experience", value: "experience" },
    { key: "e", text: "Education", value: "education" },
    { key: "d", text: "Display", value: "display" },
  ];
  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) => {
    setState({ ...state, [name]: value });
    if (
      name === "type" &&
      ["Experience", "Education", "Display", ""].includes(state.name)
    ) {
      setState({ ...state, name: artifactTypeToName(value) });
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
        <Button primary>
          <Icon corner name="add" />
          Create Page
        </Button>
      }
    >
      <Modal.Header>Create new page</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description sx={{ minHeight: "150px", overflow: "visible" }}>
          <Form.Input
            fluid
            iconPosition="left"
            icon="file"
            placeholder="Page Name"
            name="name"
            onChange={handleChange}
            value={state.name}
            size="large"
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
      <Flex sx={{ justifyContent: "center", flexDirection: "column" }}>
        {pages.length === 0 ? (
          "No pages, care to make a new one?"
        ) : (
          <Menu secondary vertical fluid>
            {pages.map(page => (
              <Page
                key={page.pageId.toString()}
                page={page}
                active={false}
                setActive={setActive}
              />
            ))}
          </Menu>
        )}
      </Flex>
      <NewPageModal />
    </Section>
  );
};

export default SectionPages;
