/** @jsx jsx */
import { jsx, Flex, Box, Styled } from "theme-ui";
import { Accordion, Icon, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { ThemeSelector } from "../../components";
import Editor from "../../components/Editor";

// import themes from "../../themes";

const Items = props => {
  //Themes
  const [theme, setTheme] = useState("base");
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
      <Flex
        m={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          border: "1px solid #ccc!important",
          boxShadow: "default",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", flex: 3 }}>
          <Styled.p>{page}</Styled.p>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Icon name="close" />
        </Box>
      </Flex>
    ));
    return items;
  } else if (props.name === "Create Artifacts") {
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Button>Add Artifacts</Button>
      </Flex>
    );
  } else if (props.name === "Text Editor") {
    return (
      <Flex sx={{ justifyContent: "center" }}>
        <Editor />
      </Flex>
    );
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
