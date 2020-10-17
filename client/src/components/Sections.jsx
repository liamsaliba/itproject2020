/** @jsx jsx */
import { jsx, Divider, Box, Container, Styled } from "theme-ui";
import React, { useState } from "react";
import PropTypes from "prop-types";

import SectionField from "./ArtifactForm";

const IsVolunteering = ({ isVoluntary }) =>
  isVoluntary ? "Is Volunteering" : "";

const IsOngoing = ({ isOngoing, startDate, endDate }) => {
  return startDate.concat(" - ", !isOngoing ? endDate : "Present");
};

const addGrade = ({ grade }) => {
  return grade ? " \u00B7 Grade: ".concat(grade) : null;
};

export const Education = () => {};

export function Section({
  isEditing,
  section: {
    type,
    title,
    field_1,
    field_2,
    location,
    grade,
    isVoluntary,
    isOngoing,
    startDate,
    endDate,
    description,
  },
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (isEditing) {
      setOpen(!open);
    }
  };

  const sectionFieldArgs = {
    state: {
      open: open,
      setOpen: setOpen,
    },
    sectionField: {
      // TODO: isNew as variable!
      isNew: true,
      type: type,
    },
  };

  const styling = {
    mt: 0,
    mb: 0,
  };

  const greyedOut = {
    color: "rgb(104, 104, 104)",
  };

  const SubHeader = () => {
    if (type === "education") {
      return (
        <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
          {field_1.concat(" \u00B7 ", field_2, addGrade())}
        </Styled.h4>
      );
    } else if (type === "experience") {
      return (
        <React.Fragment>
          <Styled.h4 sx={{ ...styling, fontWeight: "normal" }}>
            {" "}
            {field_1.concat(" \u00B7 ", field_2)}{" "}
          </Styled.h4>
        </React.Fragment>
      );
    }
    return;
  };

  return (
    <React.Fragment>
      <SectionField {...sectionFieldArgs} />
      <Container sx={{ textAlign: "left" }} onClick={handleClick}>
        <Styled.h3 sx={styling}>{title}</Styled.h3>
        <SubHeader />

        <Styled.p sx={{ ...styling, ...greyedOut, mt: "1em" }}>
          <IsOngoing />
        </Styled.p>
        <Styled.p sx={{ ...styling, ...greyedOut }}>
          <IsVolunteering />
        </Styled.p>
        <Styled.p sx={{ ...styling, ...greyedOut, mb: "1em" }}>
          {location}
        </Styled.p>

        <Styled.p sx={{ ...styling, mb: "1em" }}>{description}</Styled.p>
      </Container>
    </React.Fragment>
  );
}

Section.propTypes = {
  isEditing: PropTypes.bool,
  section: PropTypes.shape({
    title: PropTypes.string, // Job Title or School
    type: PropTypes.string, // "education" or "experience"
    field_1: PropTypes.string, // Organisation Type or Degree
    field_2: PropTypes.string, // EmploymentType or FieldOfStudy
    location: PropTypes.string, // Location or Location
    grade: PropTypes.string, // For Education ONLY
    isVoluntary: PropTypes.bool, // For Experience ONLY
    isOngoing: PropTypes.bool, // Both Experience and Education
    startDate: PropTypes.string, // Both Experience and Education
    endDate: PropTypes.string, // Both Experience and Education
    description: PropTypes.string, // Both Experience and Education
  }),
};

const GetBreakLine = ({ i, len }) => {
  if (i < len - 1) {
    return (
      <Divider sx={{ border: "0.5px solid #aaa", mt: "1em", mb: "1em" }} />
    );
  }
  return null;
};

export function Sections({ isEditing, sections }) {
  const sectionStyling = {
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
    border: "2px solid #aaa",
    borderRadius: "5px",
    p: "1em",
    m: "5em",
  };

  const SubSections = sections.map((section, i) => (
    <Box sx={{ pl: "1em", pr: "1em" }}>
      <Section isEditing={isEditing} section={section} />
      <GetBreakLine i={i} len={sections.length} />
    </Box>
  ));

  return <Box sx={sectionStyling}>{SubSections}</Box>;
}

Sections.propTypes = {
  isEditing: PropTypes.bool,
  sections: PropTypes.array,
};
