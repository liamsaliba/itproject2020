/** @jsx jsx */
import { jsx, Box, Flex, Styled } from "theme-ui";
import { Segment, Header, Icon } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";

// TODO: on click of heading in edit mode - enable editing the heading.
export const Heading = ({ name, id, editing, newbtn }) => {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <Box sx={{ flex: 1 }}></Box>
      <Styled.h2
        id={id}
        sx={{ flex: 4, justifyContent: "center", wordBreak: "break-all" }}
      >
        {name}
      </Styled.h2>
      <Box sx={{ flex: 1, float: "right" }}>{editing ? newbtn : null}</Box>
    </Flex>
  );
};

export const ContentBox = ({ type, children }) => {
  const listStyling = {
    display: "flex",
    flexFlow: "row wrap", // the wrap & flexDir makes all the difference here.
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  };

  const cardStyling = {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "stretch",
    justifyContent: "center",
  };
  // type of page determines what will be displayed
  // eslint-disable-next-line no-unused-vars
  const listTypes = ["display", "experience", "education"];
  // eslint-disable-next-line no-unused-vars
  const cardTypes = ["cards"];
  if (cardTypes.includes(type)) {
    return <Box sx={cardStyling}>{children}</Box>;
  }

  return <Box sx={listStyling}>{children}</Box>;
};

const EmptySectionPlaceholder = ({ children }) => (
  <Segment placeholder>
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
  const empty = type==="cards" ? false : content.length === 0;
  return (
    <Flex
      as="section"
      sx={{
        textAlign: "center",
        m: "0em 2em",
        mb: "3em", // space between sections
        transition: "all 0.3s",
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
      }}
      id={name}
    >
      <Heading id={id} name={name} editing={editing} newbtn={newbtn} />
      <Loader inline size="large" active={loading}>
        Loading
      </Loader>
      {empty ? (
        editing ? (
          <EmptySectionPlaceholder>{newbtn}</EmptySectionPlaceholder>
        ) : (
          <p>Coming soon!</p>
        )
      ) : (
        <ContentBox type={type}>{content}</ContentBox>
      )}
    </Flex>
  );
};

export default Section;
