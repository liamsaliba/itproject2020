/** @jsx jsx */
import { jsx, Container, Styled, Divider, Box } from "theme-ui";
import PropTypes from "prop-types";

import SubSection from './SubSection';

export default function Section({ section:{ type }, subSections }) {
  const GetBreak = ({i, len, sx}) => {
    if (i<(len-1)) {
      return( <Divider sx={{color:"var(--warm-grey-30,#e6e9ec)", mt:"1em", mb:"1em"}}/> );
    } return(null);
  }

  const SubSections = subSections.map((subSection, i) => (
    <Box sx={{ pl:"1em", pr:"1em" }}>
      <SubSection  subSection={subSection} />
      <GetBreak i={i} len={subSections.length} />
    </Box>
  ))

  return (
    <Container sx={{ boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)", border: "1px solid #aaa", borderRadius:"5px", p:"3" }}>
      <Styled.h2>{type}</Styled.h2>
      {SubSections}
    </Container>
  );
};

Section.propTypes = {
  /** Composition of the page */
  section: PropTypes.shape({ 
    type: PropTypes.string // 
  }), 
  subSections: PropTypes.array
};


