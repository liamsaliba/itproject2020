/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import Section from "./Section";

import { useState } from "react";
import {
  Button,
  Icon,
  Modal,
  List,
  Form,
  Divider,
  Header,
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
import { EditableField, Toggle } from "../../components/Form";

export const pageTypes = {
  mixed: {
    key: "m",
    text: "Default",
    value: "mix",
    icon: "asterisk",
    description: "All element types supported",
  },
  display: {
    key: "d",
    text: "Display",
    description: "Heading, body, action, media",
    value: "display",
    icon: "newspaper outline",
  },
  experience: {
    key: "x",
    text: "Experience",
    defaultPageName: "Experience",
    description: "Your jobs and positions",
    value: "experience",
    icon: "briefcase",
  },
  education: {
    key: "e",
    text: "Education",
    defaultPageName: "Education",
    description: "Your educational background",
    value: "education",
    icon: "graduation",
  },
  heading: {
    key: "h",
    text: "Heading",
    description: "with background media",
    value: "heading",
    icon: "heading",
  },
  embed: {
    key: "v",
    text: "Embed",
    description: "eg: YouTube videos",
    value: "embed",
    icon: "video",
  },
  gallery: {
    key: "g",
    text: "Gallery - Coming Soon!",
    disabled: true,
    value: "gallery",
    icon: "images",
    description: "Wall of media",
  },
  article: {
    key: "a",
    text: "Article - Coming Soon!",
    disabled: true,
    defaultPageName: "Articles",
    description: "Long prose",
    value: "article",
    icon: "file alternate outline",
  },
  publication: {
    key: "p",
    text: "Publication - Coming Soon!",
    disabled: true,
    defaultPageName: "Publications",
    description: "Published works",
    value: "publication",
    icon: "book",
  },
  talk: {
    key: "t",
    text: "Talk - Coming Soon!",
    disabled: true,
    defaultPageName: "Talks",
    value: "talk",
    icon: "talk",
  },
  custom: {
    key: "c",
    defaultPageName: "",
    text: "Custom - Coming Soon!",
    disabled: true,
    value: "custom",
    icon: "newspaper outline",
  },
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
    <div>
      <div>
        <Toggle
          label="Contact form"
          icon="address book"
          value={contact}
          setValue={value => dispatch(updateAllowContact(value))}
        />
      </div>
      <br />
      <div>
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
  const { name, id, loading, type } = page;
  const username = useSelector(selectUsername);
  const pages = useSelector(state => selectPagesByUsername(state, username));

  const typeInfo = pageTypes[type];
  const icon = typeInfo === undefined ? "file outline" : typeInfo.icon;

  const handlePageClick = e => {
    setActive(page);
  };

  return (
    <List.Item name={name} key={id.toString()} onClick={handlePageClick} fluid>
      <List.Content>
        <EditableField
          {...{
            id,
            icon,
            loading,
            value: name,
            update: name => dispatch(renamePage(id, name)),
            del: () => dispatch(deletePage(id)),
            maxLength: "15",
            pages: pages,
          }}
        />
      </List.Content>
    </List.Item>
  );
};

export const NewPageModal = props => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState(null);
  // eslint-disable-next-line
  const [state, setState] = useState({ name: "", type: "mix" });

  const options = Object.values(pageTypes);
  const dispatch = useDispatch();

  const namedTypes = [
    "Experience",
    "Education",
    "Publications",
    "Talks",
    "Articles",
    "Gallery",
  ];

  const handleChange = (e, { name, value }) => {
    if (
      name === "type" &&
      (namedTypes.includes(state.name) || state.name === "")
    ) {
      setState({
        ...state,
        name: pageTypes[value] ? pageTypes[value].defaultPageName : "",
        type: value,
      });
    } else {
      // do it this way -- setState is async
      setState({ ...state, [name]: value });
      if (props.pages.map(page => page.name).includes(value)) {
        setError(true);
        setErrorContent("Page name must be unique.");
      } else if (value === "Contact") {
        setError(true);
        setErrorContent('Page name cannot be "Contact".');
      } else {
        setError(false);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createPage(state));
    setOpen(false);
    setState({ name: "" });
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
            error={
              error
                ? {
                    content: errorContent,
                    pointing: "below",
                  }
                : false
            }
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
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={() => setOpen(false)} type="button">
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" disabled={error} type="submit">
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
  const [active, setActive] = useState("Home");

  // useEffect(() => {
  //   history.push("/logout");
  // }, [active]);

  return (
    <Section name="Pages" icon="file text">
      <Divider horizontal>
        <Header as="h3">Manage Pages</Header>
      </Divider>
      <PageSettings />
      <Divider />
      {pages.length >= 10 ? (
        <p>
          Limited to creating 10 pages. To create a new page, delete another
          page first.
        </p>
      ) : (
        <NewPageModal pages={pages} />
      )}
      <Flex
        sx={{ justifyContent: "center", flexDirection: "column", mt: "1em" }}
      >
        {pages.length === 0 ? (
          "No pages."
        ) : (
          // replace with https://react.semantic-ui.com/elements/list/#types-divided
          <List divided relaxed sx={{ textAlign: "left" }}>
            {pages.map(page => (
              <Page
                key={page.id.toString()}
                page={page}
                active={active}
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
