/** @jsx jsx */
import { jsx, Flex } from "theme-ui";
import { Accordion, Icon, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { ThemeSelector } from "../../components";
import TextEditor from "../../components/TextEditor";
import PageList from "../../components/PageList";

// import themes from "../../themes";

const ItemSettings = props => {
  const [theme, setTheme] = useState("base");

  return (
    <React.Fragment>
      <Flex sx={{ justifyContent: "center" }}>
        <div>
          <Icon name="paint brush" />
          Theme
          <ThemeSelector theme={theme} setTheme={setTheme} />
        </div>
      </Flex>
    </React.Fragment>
  );
};

const Items = props => {
  // const [preset, setPreset] = useState(themes[theme]);
  // preset should be used within ThemeProvider to wrap the section => User. (Store functionality)

  /* useEffect(() => {
    setPreset(themes[theme]);
  }, [theme]); */

  if (props.name === "Settings") {
    return ItemSettings(props);
  } else if (props.name === "Pages") {
    return <PageList pages={props.pages} />;
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
  const icons = ["settings", "file text", "file", "paragraph"];
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
    <Accordion
      key={name + index}
      styled
      name={name}
      exclusive={false}
      fluid
      sx={{ p: "0.2em" }}
    >
      <Accordion.Title
        active={activeAccordion === index}
        index={index}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        <Icon name={icons[index]} sx={{ pr: "1.5em" }} />
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
