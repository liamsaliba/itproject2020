/** @jsx jsx */

import { jsx, Label, Styled, Box,} from "theme-ui";

import React, { useState } from 'react';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Header,
  Input,
  Checkbox,
  Button,
  TextArea, 
  Form
} from "semantic-ui-react";

// import { toast } from "react-toastify";

import DatePicker from 'react-datepicker';

import { PropTypes } from 'prop-types';



export default function SectionField({ sectionField: {type, },  }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isVolunteering, setIsVoluntary] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const StartDatePicker = () => (
    <React.Fragment>
      <DatePicker 
        sx={inputFieldStyle}
        selected={startDate} 
        onChange={date => setStartDate(date)}
        dateFormat="MM/yyy"
        showMonthYearPicker
      />
    </React.Fragment>
  );

  const EndDatePicker = () => (
    <DatePicker 
      sx={inputFieldStyle} 
      selected={endDate} 
      onChange={date => setEndDate(date)}
      dateFormat="MM/yyy"
      showMonthYearPicker
    />
  );

  const inputFieldStyle = {
    mb:"3",
    width:"100%",
  };

  /* const handleSave = e => {
    // e.preventDefault();
    // const formData = new FormData(e.target);
    // dispatch(login(formData.get("username"), formData.get("password")));
  }; */

  
  if (type==="education") {
    return (
      // <Box as="form" onSubmit={handleSave}>
      <Box as="form">
        <Header size='large'>Edit {type}</Header>
        <br />
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

        <Button>Save</Button>
        {/* {auth.loading ? <Spinner /> : null} */}
      </Box>
    );
  }

  else if (type==="experience") {
    return (
      // <Box as="form" onSubmit={handleSave}>
      <Box as="form">
        <Styled.h2>Edit {type}</Styled.h2>
        <br />
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

        <Button>Save</Button>
        {/* {auth.loading ? <Spinner /> : null} */}
      </Box>
    );
  }
};

SectionField.propTypes={
  sectionField: PropTypes.shape({
    type: PropTypes.string, // {"education", "experience"}
  }),
};