/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";
import { Segment, Header, Icon } from "semantic-ui-react";
import { Dimmer } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

export const Dot = () => (
  <Icon color="red" name="circle" size="mini" sx={{ verticalAlign: "top" }} />
);

// TODO: on click of heading in edit mode - enable editing the heading.
const Heading = ({ name, id, editing, newbtn }) => {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Box sx={{ flex:1 }}></Box>
      <Styled.h2 id={id} sx={{ flex: 1, justifyContent: "center" }}>
        {name}
      </Styled.h2>
      <Box sx={{ flex: 1, float: "right" }}>{editing ? newbtn : null}</Box>
    </Flex>
  );
};

const ContentBox = ({ type, children }) => {
  const listStyling = {
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  // type of page determines what will be displayed
  const listTypes = ["display", "experience", "education"];
  // eslint-disable-next-line no-unused-vars
  const cardTypes = ["cards"];
  if (listTypes.includes(type)) {
    return <Box sx={listStyling}>{children}</Box>;
  }
};

const EmptySectionPlaceholder = ({ children }) => (
  <Segment placeholder fluid>
    <Header icon>
      <Icon name="file outline" />
      Nothing on this page yet.
    </Header>
    {children}
  </Segment>
);

export const Section = ({
  id,
  name,
  editing,
  type,
  content,
  newbtn,
  loading,
}) => {
  return (
    <Flex
      sx={{
        textAlign: "center",
        m: "0em 2em",
        mb: "3em", // space between sections
        transition: "all 0.3s",
        minHeight: "10em",
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
      id={name}
    >
      <Dimmer inverted active={loading}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
      <Heading id={id} name={name} editing={editing} newbtn={newbtn} />
      {editing && content.length === 0 ? (
        <EmptySectionPlaceholder>{newbtn}</EmptySectionPlaceholder>
      ) : (
        <ContentBox type={type}>{content}</ContentBox>
      )}
    </Flex>
  );
};

export default Section;
