/** @jsx jsx */

import { jsx, Label, Box,} from "theme-ui";

import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Input,
  Checkbox,
  Button,
  TextArea, 
  Form,
  Modal,
} from "semantic-ui-react";

// import { toast } from "react-toastify";

import DatePicker from 'react-datepicker';

import { PropTypes } from 'prop-types';



export default function SectionField({ state:{open, setOpen}, sectionField: {isNew, type, },  }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isVolunteering, setIsVoluntary] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const modalStyle = { 
    mr: "5em",
    ml: "5em"
  };

  const inputFieldStyle = {
    mb:"3",
    width:"100%",
    border: "1.5px", 
  };

  const datePickerStyle = {
    ...inputFieldStyle, 
    border: "1.5px solid #aaa", 
    borderRadius:"5px"
  };

  const StartDatePicker = () => (
    <React.Fragment>
      <DatePicker 
        sx={datePickerStyle}
        selected={startDate} 
        onChange={date => setStartDate(date)}
        dateFormat="MM/yyy"
        showMonthYearPicker
      />
    </React.Fragment>
  );

  const EndDatePicker = () => (
    <DatePicker 
      sx={datePickerStyle} 
      selected={endDate} 
      onChange={date => setEndDate(date)}
      dateFormat="MM/yyy"
      showMonthYearPicker
    />
  );

  const getEditing = () => {
    return (isNew) ? "Create" : "Edit"
  }
  

  /* const handleSave = e => {
    // e.preventDefault();
    // const formData = new FormData(e.target);
    // dispatch(login(formData.get("username"), formData.get("password")));
  }; */

  
  const Education = () => (
    <Box as="form">
      <Label htmlFor="School">School *</Label>
      <Input name="school" sx={inputFieldStyle} />

      <Label htmlFor="Degree">Degree *</Label>
      <Input name="degree" sx={inputFieldStyle} />

      <Label htmlFor="Field Of Study">Field Of Study</Label>
      <Input name="employmentType" sx={inputFieldStyle} />

      <Label htmlFor="Location">Location</Label>
      <Input name="location" sx={inputFieldStyle} />

      <Label htmlFor="Grade">Grade</Label>
      <Input name="grade" sx={inputFieldStyle} />

      <Box sx={{...inputFieldStyle, display:"flex"}}>
        <Box sx={{mr:"2em"}}>
          <Label  htmlFor="StartDate">Start Date *</Label>
          <StartDatePicker />
        </Box>
        
        <Box>
          <Label htmlFor="EndDate">End Date (or expected)</Label>
          <EndDatePicker />
        </Box>
      </Box>

      <Label htmlFor="Description">Tell us about it!</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="password"/>
      </Form>
      {/* {auth.loading ? <Spinner /> : null} */}
    </Box>
  );

  const Experience = () => (
    // <Box as="form" onSubmit={handleSave}>
    <Box as="form">
      
      <Label htmlFor="Job Title">Job Title *</Label>
      <Input name="jobTitle" sx={inputFieldStyle} />

      <Label htmlFor="Organisation">Organisation *</Label>
      <Input name="organisation" sx={inputFieldStyle} />

      <Label htmlFor="Employment Type">Employment Type</Label>
      <Input name="employmentType" sx={inputFieldStyle} />

      <Label htmlFor="Location">Location</Label>
      <Input name="location" sx={inputFieldStyle} />

      <Box sx={inputFieldStyle}>
          <Checkbox sx={{mr:"2em"}} label="Is this a volunteering role?" name={"isVoluntary"} onChange={() => setIsVoluntary(!isVolunteering)}/>
      </Box>

      <Box sx={inputFieldStyle}>
          <Checkbox label="Is this an ongoing role?" name={"isOngoing"} onChange={() => setIsOngoing(!isOngoing)}/>
      </Box>

      <Box sx={{...inputFieldStyle, display:"flex"}}>
        <Box sx={{mr:"2em"}}>
          <Label htmlFor="StartDate">Start Date *</Label>
          <StartDatePicker />
        </Box>
        
        {(isOngoing ? null : 
          <Box>
            <Label htmlFor="EndDate">End Date</Label>
            <EndDatePicker />
          </Box>
        )}
      </Box>

      <Label htmlFor="Description">Tell us about it!</Label>
      <Form sx={inputFieldStyle}>
        <TextArea name="password"/>
      </Form>
      {/* {auth.loading ? <Spinner /> : null} */}
    </Box>
  );
  
  if (type==="Education") {
    return (
      <Modal
        sx={modalStyle}
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>{getEditing()} Education</Modal.Header>
        <Modal.Content>
          <Education />
        </Modal.Content>
        <Modal.Actions>
          <Button color="gray" >Delete</Button> 
          <Button>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }

  else if (type==="Experience") {
    return (
      <Modal
        sx={modalStyle}
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>{getEditing()} Experience</Modal.Header>
        <Modal.Content>
          <Experience />
        </Modal.Content>
        <Modal.Actions>
          <Button color="gray" >Delete</Button> 
          <Button>Save</Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};

SectionField.propTypes={
  state: PropTypes.shape({
    open: PropTypes.bool, // Modal State
    setOpen: PropTypes.func, // Toggle Modal State
  }),
  sectionField: PropTypes.shape({
    isNew: PropTypes.bool, // if true, creating , else editing
    type: PropTypes.string, // {"Education", "Experience"}
  }),
};