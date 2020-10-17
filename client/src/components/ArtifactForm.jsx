/** @jsx jsx */
import { jsx, Box, Flex } from "theme-ui";
import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

// used https://codesandbox.io/s/semantic-ui-react-form-hooks-vnyjh?from-embed=&file=/example.js:594-698
// for react-form-hooks w semantic ui example

import {
  Input,
  Checkbox,
  Header,
  Button,
  TextArea,
  Form,
  Modal,
} from "semantic-ui-react";

import DatePicker from "react-datepicker";

const fieldInputStyle = {
  mb: "1em",
  width: "100%",
  border: "1.5px",
};

const Required = <span sx={{ color: "red" }}>*</span>;

const FieldHeader = ({ name, required }) => {
  return (
    <Header as="h4" htmlFor={name}>
      {name}
      {required ? <Required /> : null}
    </Header>
  );
};

const FieldInput = ({ name, id, required }) => {
  const style = fieldInputStyle;
  // TODO use Form.Field
  return (
    <React.Fragment>
      <FieldHeader name={name} required />
      <TextArea sx={style} name={id} />
    </React.Fragment>
  );
};

const FieldCheck = ({ name, id, val, setVal }) => {
  return (
    <Box sx={fieldInputStyle}>
      <Checkbox label={name} name={id} onChange={() => setVal(!{ val })} />
    </Box>
  );
};

// <Form.Input label={name} name={id} required={required} placeholder={placeholder} control="textarea"/>

// TODO: Media Gallery
const MediaUpload = () => (
  <React.Fragment>
    <Form.Input label="Upload Media" type="file" name="media" />
    <Form.Input
      label="Media Description"
      name="description"
      control="textarea"
    />
  </React.Fragment>
);

const DisplayForm = () => (
  <Box>
    <FieldInput name="Header" id="header" />
    <FieldInput name="Body" id="body" />
    <MediaUpload />
  </Box>
);

const EducationForm = () => {
  return (
    <Box>
      <FieldInput name="School" id="school" required />
      <FieldInput name="Degree" id="degree" required />
      <FieldInput name="Field of study" id="field" />
      <FieldInput name="Location" id="location" />
      <FieldInput name="Grade" id="grade" />

      <StartEndDatePicker />
      <MediaUpload />

      <FieldInput name="Details" id="details" />
    </Box>
  );
};

const ExperienceForm = () => {
  const employmentOptions = [
    { key: "f", text: "Full Time", value: "Full Time" },
    { key: "p", text: "Part Time", value: "Part Time" },
    { key: "s", text: "Self-employed", value: "Self-employed" },
    { key: "fl", text: "Freelance", value: "Freelance" },
    { key: "i", text: "Internship", value: "Internship" },
  ];
  // <Box as="form" onSubmit={handleSave}>
  return (
    <Box>
      <FieldInput name="Job Title" id="title" required />
      <FieldInput name="Organisation" id="organisation" required />
      <FieldInput name="Department" id="department" />
      <FieldInput name="Location" id="location" />
      {/* TODO: Should be a Select (Full time, part time, ...) */}
      <Form.Select
        fluid
        required
        label="Employment Type"
        options={employmentOptions}
        placeholder="Type"
        name="type"
        // sx={{ zIndex: "999999 !important" }}
      />
      <FieldInput name="Employment Type" id="employmentType" />

      <FieldCheck name={"Is this a volunteering role?"} id={"isVoluntary"} />
      <StartEndDatePicker />
      <MediaUpload />

      {/* "Tell us about it!" */}
      <FieldInput name="Details" id="details" />
    </Box>
  );
};

const ArtifactForm = ({ type, pageId, isNew }) => {
  const thisForm = forms[type];
  if (!thisForm) return null;

  const header = (isNew ? "Create new " : "Edit ").concat(thisForm.title);
  return <FormModal {...thisForm} pageId={pageId} header={header} />;
};

const forms = {
  education: {
    Content: <EducationForm />,
    title: "Education",
    initialState: {},
    // TODO: callback: ,
  },
  experience: {
    Content: <ExperienceForm />,
    title: "Experience",
    // TODO: callback: ,
  },
  display: {
    Content: <DisplayForm />,
    title: "Display",
    // TODO: callback: ,
  },
};

// Content: the actual form
const FormModal = ({ title, initialState, action, pageId, Content }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const form = useForm();
  const { handleSubmit, setValue, triggerValidation } = form;

  const onSubmit = (data, e) => {
    // e.preventDefault();
    console.log("Submit event", e);
    console.log(data);
    // if (action) dispatch(action(state));
    setOpen(false);
  };

  const onChange = async (e, { name, value }) => {
    setValue(name, value);
    await triggerValidation({ name });
  };

  return (
    <FormProvider {...form} onChange={onChange}>
      <Modal
        size="small"
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        as={Form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Content />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            labelPosition="left"
            icon="trash"
            onClick={() => setOpen(false)}
          >
            Delete
          </Button>
          <Button
            color="blue"
            type="submit"
            labelPosition="left"
            icon="checkmark"
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </FormProvider>
  );
};

const MyDatePicker = ({ startDate, onChange, disabled = false }) => {
  const style = {
    ...fieldInputStyle,
    border: "1.5px solid #aaa",
    borderRadius: "5px",
  };

  return (
    <DatePicker
      sx={style}
      selected={startDate}
      onChange={onChange}
      dateFormat="MM/yyy"
      showMonthYearPicker
      disabled={disabled}
    />
  );
};

const StartEndDatePicker = () => (
  <React.Fragment>
    <FieldCheck name={"Is this an ongoing role?"} id={"isOngoing"} />

    <Flex sx={{ ...fieldInputStyle }}>
      <Box sx={{ mr: "2em" }}>
        <FieldHeader name={"Start Date"} required />
        <MyDatePicker
          startDate={Date.now()}
          // onChange={date => setStartDate(date)}
        />
      </Box>
      <Box>
        <FieldHeader name={"End Date (or expected)"} />
        <MyDatePicker
          startDate={Date.now()}
          // onChange={date => setEndDate(date)}
          disabled={true}
          // disabled={!isOngoing}
        />
      </Box>
    </Flex>
  </React.Fragment>
);

export default ArtifactForm;

// SectionField.propTypes = {
//   state: PropTypes.shape({
//     open: PropTypes.bool, // Modal State
//     setOpen: PropTypes.func, // Toggle Modal State
//   }),
//   sectionField: PropTypes.shape({
//     isNew: PropTypes.bool, // if true, creating , else editing
//     type: PropTypes.string, // {"Education", "Experience"}
//   }),
// };
