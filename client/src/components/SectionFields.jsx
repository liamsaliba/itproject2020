/** @jsx jsx */

import { jsx, Box } from "theme-ui";

import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker-cssmodules.css";

import "react-datepicker/dist/react-datepicker.css";

import {
  Input,
  Checkbox,
  Header,
  Button,
  TextArea,
  Form,
  Modal,
} from "semantic-ui-react";

// import { toast } from "react-toastify";

import DatePicker from "react-datepicker";

import { PropTypes } from "prop-types";

export default function SectionField({
  state: { open, setOpen },
  sectionField: { isNew, type },
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [isVolunteering, setIsVoluntary] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);

  const modalStyle = {
    mt: "3em",
  };

  const inputFieldStyle = {
    mb: "3",
    width: "100%",
    border: "1.5px",
  };

  const datePickerStyle = {
    ...inputFieldStyle,
    border: "1.5px solid #aaa",
    borderRadius: "5px",
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
    return isNew ? "Create" : "Edit";
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(state);
    // dispatch(createPage(state));
    setOpen(false);
  };

  const Education = () => (
    <Box>
      <Header as="h4" htmlFor="School">
        School *
      </Header>
      <Input name="school" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Degree">
        Degree *
      </Header>
      <Input name="degree" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Field Of Study">
        Field Of Study
      </Header>
      <Input name="employmentType" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Location">
        Location
      </Header>
      <Input name="location" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Grade">
        Grade
      </Header>
      <Input name="grade" sx={inputFieldStyle} />

      <Box sx={{ ...inputFieldStyle, display: "flex" }}>
        <Box sx={{ mr: "2em" }}>
          <Header as="h4" htmlFor="StartDate">
            Start Date *
          </Header>
          <StartDatePicker />
        </Box>

        <Box>
          <Header as="h4" htmlFor="EndDate">
            End Date (or expected)
          </Header>
          <EndDatePicker />
        </Box>
      </Box>

      <Header as="h4" htmlFor="Description">
        Tell us about it!
      </Header>
      <TextArea name="description" sx={inputFieldStyle} />
      {/* {auth.loading ? <Spinner /> : null} */}
    </Box>
  );

  const Experience = () => (
    // <Box as="form" onSubmit={handleSave}>
    <Box>
      <Header as="h4" htmlFor="Job Title">
        Job Title *
      </Header>
      <Input name="jobTitle" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Organisation">
        Organisation *
      </Header>
      <Input name="organisation" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Employment Type">
        Employment Type
      </Header>
      <Input name="employmentType" sx={inputFieldStyle} />

      <Header as="h4" htmlFor="Location">
        Location
      </Header>
      <Input name="location" sx={inputFieldStyle} />

      <Box sx={inputFieldStyle}>
        <Checkbox
          sx={{ mr: "2em" }}
          label="Is this a volunteering role?"
          name={"isVoluntary"}
          onChange={() => setIsVoluntary(!isVolunteering)}
        />
      </Box>

      <Box sx={inputFieldStyle}>
        <Checkbox
          label="Is this an ongoing role?"
          name={"isOngoing"}
          onChange={() => setIsOngoing(!isOngoing)}
        />
      </Box>

      <Box sx={{ ...inputFieldStyle, display: "flex" }}>
        <Box sx={{ mr: "2em" }}>
          <Header as="h4" htmlFor="StartDate">
            Start Date *
          </Header>
          <StartDatePicker />
        </Box>

        {isOngoing ? null : (
          <Box>
            <Header as="h4" htmlFor="EndDate">
              End Date
            </Header>
            <EndDatePicker />
          </Box>
        )}
      </Box>

      <Header as="h4" htmlFor="Description">
        Tell us about it!
      </Header>
      <TextArea name="description" sx={inputFieldStyle} />
      {/* {auth.loading ? <Spinner /> : null} */}
    </Box>
  );

  if (type === "education") {
    return (
      <Modal
        sx={modalStyle}
        size="small"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        as={Form}
        onSubmit={handleSubmit}
      >
        <Modal.Header>{getEditing()} Education</Modal.Header>
        <Modal.Content>
          <Education />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">Delete</Button>
          <Button color="blue" type="submit">
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  } else if (type === "experience") {
    return (
      <Modal
        sx={modalStyle}
        size="small"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        as={Form}
        onSubmit={handleSubmit}
      >
        <Modal.Header>{getEditing()} Experience</Modal.Header>
        <Modal.Content>
          <Experience />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red">Delete</Button>
          <Button color="blue" type="submit">
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
}

SectionField.propTypes = {
  state: PropTypes.shape({
    open: PropTypes.bool, // Modal State
    setOpen: PropTypes.func, // Toggle Modal State
  }),
  sectionField: PropTypes.shape({
    isNew: PropTypes.bool, // if true, creating , else editing
    type: PropTypes.string, // {"Education", "Experience"}
  }),
};
