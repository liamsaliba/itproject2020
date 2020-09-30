/** @jsx jsx */
import { jsx, Container, Styled, Divider, Box } from "theme-ui";
import PropTypes from "prop-types";

import { useState } from 'react';

import SubSection from './SubSection';
import SectionField from './SectionFields';

export default function Section({ isEditing, section:{ type }, subSections }) {
  const [open, setOpen] = useState(false);

  const sectionStyling = {
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.15)", 
    border: "1px solid #aaa", 
    borderRadius:"5px", 
    p:"3" 
  }

  const GetBreakLine = ({i, len, sx}) => {
    if (i<(len-1)) {
      return( <Divider sx={{color:"var(--warm-grey-30,#e6e9ec)", mt:"1em", mb:"1em"}}/> );
    } return(null);
  }

  const SubSections = subSections.map((subSection, i) => (
    <Box sx={{ pl:"1em", pr:"1em" }}>
      <SubSection subSection={subSection} />
      <GetBreakLine i={i} len={subSections.length} />
    </Box>
  ))

  const sectionFieldArgs = {
    state:{
      open: open, 
      setOpen: setOpen,
    }, 
    sectionField:{
      isNew: false, 
      type: type,
    }
  }

  const handleClick = () => {
    if (isEditing) {
      setOpen(!open)
    }
  }

  return (
    <Container 
      sx={sectionStyling}
      onClick={handleClick}
    >
      <SectionField {...sectionFieldArgs}/>
      <Styled.h2>{type}</Styled.h2>
      {SubSections}
    </Container>
  );
};

Section.propTypes = {
  /** Composition of the page */
  editingMode: PropTypes.bool,
  section: PropTypes.shape({ 
    type: PropTypes.string // 
  }), 
  subSections: PropTypes.array
};


