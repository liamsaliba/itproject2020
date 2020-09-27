import React from "react";
import PropTypes from "prop-types";
import { Container, Styled } from "theme-ui";

export default function PageSection({title, field_1, field_2, field_3, grade, isVoluntary, isOngoing, startDate, endDate, description}) {
  const styling = {
    m:"0em",
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
        <Styled.h3 m={0} >{title}</Styled.h3>
        <Styled.h4 m={0} >{field_1}</Styled.h4>
        <Styled.h4 m={0} >{field_2}</Styled.h4>
        <Styled.p m={0} >{field_3}</Styled.p>
        <Styled.p m={0} >{grade}</Styled.p>
        <Styled.p m={0} >{(IsVolunteering) ? "" : "Is Volunteering"}</Styled.p>
        <Styled.p m={0} >{IsOngoing}</Styled.p>
        <Styled.p m={0} >{description}</Styled.p>
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
