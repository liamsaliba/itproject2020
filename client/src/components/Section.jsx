/** @jsx jsx */
import { jsx, Divider, Box } from "theme-ui";
import PropTypes from "prop-types";

import SubSection from './SubSection';

export default function Section({ isEditing, section:{ type }, subSections }) {
  const sectionStyling = {
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)",
    border: "2px solid #aaa",
    borderRadius: "5px",
    p: "1em",
    m: "5em"
  };

  const GetBreakLine = ({ i, len, sx }) => {
    if (i < len - 1) {
      return (
        <Divider
          sx={{ border: "0.5px solid #aaa", mt: "1em", mb: "1em" }}
        />
      );
    }
    return null;
  };

  const SubSections = subSections.map((subSection, i) => (
    <Box sx={{ pl:"1em", pr:"1em" }}>
      <SubSection isEditing={isEditing} subSection={subSection} />
      <GetBreakLine i={i} len={subSections.length} />
    </Box>
  ));

  return (
    <Box sx={sectionStyling} >
      {SubSections}
    </Box>
  );
}

Section.propTypes = {
  /** Composition of the page */
  isEditing: PropTypes.bool,
  section: PropTypes.shape({
    type: PropTypes.string, //
  }),
  subSections: PropTypes.array,
};
