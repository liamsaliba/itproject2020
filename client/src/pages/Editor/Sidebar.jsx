/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import {
  Accordion,
  Icon,
  Button,
  Dropdown,
  Menu,
  Grid,
} from "semantic-ui-react";
import React, { useState } from "react";
import { ThemeSelector } from "../../components";
import TextEditor from "../../components/TextEditor";

// import themes from "../../themes";

const Items = props => {
  //Themes
  const [theme, setTheme] = useState("base");
  const [activeItem, setActive] = useState("Home");

  const handlePageClick = (e, page) => {
    setActive(activeItem === { page });
  };

  // const [preset, setPreset] = useState(themes[theme]);
  // preset should be used within ThemeProvider to wrap the section => User. (Store functionality)

  /* useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]); */

  if (props.name === "Settings") {
    return (
      <React.Fragment>
        <Flex sx={{ justifyContent: "center" }}>
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </Flex>
      </React.Fragment>
    );
  } else if (props.name === "Pages") {
    const items = props.pages.map(page => (
      <Menu.Item
        name={page}
        active={activeItem === { page }}
        onClick={handlePageClick}
      >
        <span>
          <Grid>
            <Grid.Column floated="left" width={5}>
              {page}
            </Grid.Column>
            <Grid.Column floated="right" width={3}>
              <Dropdown right aligned floating inline direction="left">
                <Dropdown.Menu>
                  <Dropdown.Item>Rename Page</Dropdown.Item>
                  <Dropdown.Item>Delete Page</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </span>
      </Menu.Item>
    ));
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Menu secondary vertical>
          {items}
          <Menu.Item
            name="Create Page"
            active={activeItem === "Create Page"}
            onClick={handlePageClick}
          >
            Create Page
            <Icon name="plus" />
          </Menu.Item>
        </Menu>
      </Flex>
    );
  } else if (props.name === "Create Artifacts") {
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Button>Add Artifacts</Button>
      </Flex>
    );
  } else if (props.name === "Text Editor") {
    const defaultText =
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate" +
      "nisi quibusdam saepe. Commodi temporibus, atque rem unde vel," +
      "voluptatem tempore quisquam fugit exercitationem voluptates sint." +
      "Porro temporibus quisquam eveniet molestiae.";
    return <TextEditor textEditor={{ defaultText }} />;
  } else {
    return (
      <div>
        Error, Incorrect Section Name! Items Component in Editor/SideBar.jsx
      </div>
    );
  }
};

const Sections = () => {
  const [activeAccordion, setActive] = useState(-1);

  // Hard Coded Section Names Here
  const names = ["Settings", "Pages", "Create Artifacts", "Text Editor"];
  const pages = ["Home", "Publications", "Projects", "Experience", "About"];

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    setActive(activeAccordion === index ? -1 : index);
  };

  // Styling
  const styling = {
    overflowY: "auto",
    overflowX: "hidden",
  };

  let sections = names.map((name, index) => (
    <Accordion styled name={name} exclusive={false} fluid>
      <Accordion.Title
        active={activeAccordion === index}
        index={index}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        {name}
      </Accordion.Title>

      <Accordion.Content sx={styling} active={activeAccordion === index}>
        <Items name={name} pages={name === "Pages" ? pages : null} />
      </Accordion.Content>
    </Accordion>
  ));

  return sections;
};

export { Sections };
