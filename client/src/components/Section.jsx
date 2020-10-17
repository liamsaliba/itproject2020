/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";
import { Segment, Header, Icon } from "semantic-ui-react";

// TODO: on click of heading in edit mode - enable editing the heading.
const Heading = ({ name, id, editing, newbtn }) => {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Styled.h2 id={id} sx={{ flex: 1, justifyContent: "center" }}>
        {name}
      </Styled.h2>
      <Box sx={{ float: "right" }}>{editing ? newbtn : null}</Box>
    </Flex>
  );
};

const ContentBox = ({ type, children }) => {
  const listStyling = {
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "row",
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

export const Section = ({ id, name, editing, type, content, newbtn }) => {
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
