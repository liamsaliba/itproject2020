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
} from "semantic-ui-react";
import { selectUsername, selectPortfolioPages, createPage } from "../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PageDropdown = () => {
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
        <Dropdown.Item>
          <Icon name="i cursor" fitted /> Rename
        </Dropdown.Item>
        <Dropdown.Item>
          <Icon name="trash" fitted /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Page = ({ active, setActive, page }) => {
  const handlePageClick = e => {
    setActive(page);
  };

  return (
    <Menu.Item name={page} active={active} onClick={handlePageClick}>
      <Grid>
        <Grid.Column floated="left" width={6} sx={{ verticalAlign: "middle" }}>
          <span>{page}</span>
        </Grid.Column>
        <Grid.Column floated="right" width={3}>
          <PageDropdown />
        </Grid.Column>
      </Grid>
    </Menu.Item>
  );
};

const NewPageModal = () => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const options = [
    { key: "x", text: "Experience", value: "experience" },
    { key: "e", text: "Education", value: "education" },
    { key: "d", text: "Display", value: "display" },
  ];
  const dispatch = useDispatch();

  const handleChange = (e, { name, value }) =>
    setState({ ...state, [name]: value });

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
      <Modal.Header>
        <Form.Input
          transparent
          placeholder="Page Name"
          name="name"
          onChange={handleChange}
          required
        />
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description sx={{ minHeight: "150px" }}>
          <Form.Select
            fluid
            required
            label="Type"
            options={options}
            placeholder="Type"
            onChange={handleChange}
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
  console.log(pages, username);
  // eslint-disable-next-line
  const [activePage, setActive] = useState("Home");
  // activePage === page

  return (
    <Section name="Pages" icon="file text">
      <Flex sx={{ justifyContent: "center", flexDirection: "column" }}>
        {pages.length === 0 ? (
          "No pages, care to make a new one?"
        ) : (
          <Menu secondary vertical>
            {pages.map(page => (
              <Page
                key={page}
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
