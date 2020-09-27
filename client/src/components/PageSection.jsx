import React from "react";
import PropTypes from "prop-types";
import { Container, Styled } from "theme-ui";

export default function PageSection({title, field_1, field_2, field_3, grade, isVoluntary, isOngoing, startDate, endDate, description}) {
  const styling = {
    marginBlockStart: "0em",
    marginBlockEnd: "0em",
  };

  const IsVolunteering = () => (
    (isVoluntary) ? "" : "Is Volunteering"
  );

  const IsOngoing = () => {
    const add = (isOngoing) ? endDate : "Present";
    return startDate.concat(" - ", add);

  };

  const Out = () => {
    return (
      <Container sx={{textAlign:"left", padding:"5px"}}>
        <Styled.h3 {...styling} >{title}</Styled.h3>
        <Styled.h4 {...styling} >{field_1}</Styled.h4>
        <Styled.h4 {...styling} >{field_2}</Styled.h4>
        <Styled.p {...styling} >{field_3}</Styled.p>
        <Styled.p {...styling} >{grade}</Styled.p>
        <Styled.p {...styling} >{(IsVolunteering) ? "" : "Is Volunteering"}</Styled.p>
        <Styled.p {...styling} >{IsOngoing}</Styled.p>
        <Styled.p {...styling} >{description}</Styled.p>
      </Container> 
    );
  }

  return (
    <Out />
  );
}

PageSection.propTypes = {
  /** Composition of the page */
  title: PropTypes.string,          // Job Title or School
  field_1: PropTypes.string,        // Employment Type or Location
  field_2: PropTypes.string,        // Organisation or Degree
  field_3: PropTypes.string,        // Location or FieldOfStudy
  grade: PropTypes.bool,            // For Education ONLY
  isVoluntary: PropTypes.bool,      // For Experience ONLY
  isOngoing: PropTypes.bool,        // Both Experience and Education
  startDate: PropTypes.string,      // Both Experience and Education
  endDate: PropTypes.string,        // Both Experience and Education
  description: PropTypes.string     // Both Experience and Education
};
