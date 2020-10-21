/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
// used https://codesandbox.io/s/semantic-ui-react-form-hooks-vnyjh?from-embed=&file=/example.js:594-698
// for react-form-hooks w semantic ui example

import { ChooseMedia } from "./Media";

import { Button, Form, Modal, Icon } from "semantic-ui-react";

import ReactDatePicker from "react-datepicker";
import { DeleteConfirmationModal } from "../pages/Editor/SectionPages";
import { createArtifact, deleteArtifact, editArtifact } from "../store";
import { useDispatch } from "react-redux";

const getErrors = (errors, field) =>
  errors[field]
    ? {
        content: errors[field].message,
        pointing: "below",
      }
    : null;

const DisplayForm = () => {
  const { errors } = useFormContext();

  const orientationOptions = [
    { key: "l", text: "Align left", value: "left", icon: "align left" },
    {
      key: "c",
      text: "Align center",
      value: "center",
      icon: "align center",
    },
    {
      key: "r",
      text: "Align right",
      value: "right",
      icon: "align right",
    },
  ];

  return (
    <Box>
      <Controller
        as={Form.Input}
        error={getErrors(errors, "header")}
        name="header"
        label="Header"
        size="large"
      />
      <Controller
        as={Form.Input}
        name="body"
        label="Body"
        error={getErrors(errors, "body")}
      />
      <Controller
        as={Form.Select}
        error={getErrors(errors, "orientationOptions")}
        fluid
        required
        label="Alignment"
        options={orientationOptions}
        name="orientation"
      />
      <Form.Field>
        <label>Attached Media</label>
        <Controller
          name="media"
          render={({ onChange, value, name }) => (
            <ChooseMedia
              multiple
              {...{
                onChange,
                value,
                name,
              }}
            />
          )}
        />
      </Form.Field>
    </Box>
  );
};

const EducationForm = () => {
  const { errors } = useFormContext();

  return (
    <Box>
      <Controller
        as={Form.Input}
        error={getErrors(errors, "school")}
        name="school"
        label="School"
        placeholder="Hogwarts School of Witchcraft and Wizardry"
        required
        rules={{ required: true }}
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "header")}
        rules={{ required: true }}
        name="degree"
        label="Degree"
        placeholder="High School"
        required
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "fieldOfStudy")}
        name="fieldOfStudy"
        label="Field of study"
        placeholder="Studies in Dark Arts"
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "location")}
        name="location"
        label="Location"
        placeholder="Beyond Platform 9 3/4"
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "grade")}
        name="grade"
        label="Grade"
        placeholder="Outstanding"
      />

      <Form.Group widths="equal">
        <Form.Field required>
          <label>Start Date</label>
          <Controller
            name="startDate"
            required
            render={props => (
              <ReactDatePicker
                // sx={datePickerStyle}
                required
                className="input"
                placeholderText="Choose start date"
                dateFormat="MM/yyy"
                showMonthYearPicker
                onChange={e => props.onChange(e)}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <label>End Date (or expected)</label>
          <Controller
            name="endDate"
            required
            render={props => (
              <ReactDatePicker
                // sx={datePickerStyle}
                className="input"
                required
                placeholderText="Choose end date"
                dateFormat="MM/yyy"
                showMonthYearPicker
                onChange={e => props.onChange(e)}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Attached Media</label>
        <ChooseMedia />
      </Form.Field>

      <Controller
        as={Form.TextArea}
        error={getErrors(errors, "details")}
        name="details"
        label="Details"
        placeholder="Quiddich Player of the Season, 2019"
      />
    </Box>
  );
};

const ExperienceForm = () => {
  const { errors } = useFormContext();

  const employmentOptions = [
    { key: "f", text: "Full Time", value: "Full Time" },
    { key: "p", text: "Part Time", value: "Part Time" },
    { key: "s", text: "Self-employed", value: "Self-employed" },
    { key: "fl", text: "Freelance", value: "Freelance" },
    { key: "i", text: "Internship", value: "Internship" },
  ];
  return (
    <Box>
      <Controller
        as={Form.Input}
        error={getErrors(errors, "jobTitle")}
        name="jobTitle"
        label="Job Title"
        placeholder="Auror"
        required
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "organisation")}
        name="organisation"
        label="Organisation"
        placeholder="Ministry of Magic"
        required
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "department")}
        name="department"
        label="Department"
        placeholder="Department of Dark Arts"
      />
      <Controller
        as={Form.Input}
        error={getErrors(errors, "location")}
        name="location"
        label="Location"
        placeholder="London Underground, UK"
      />
      <Controller
        as={Form.Select}
        error={getErrors(errors, "employmentOptions")}
        fluid
        required
        label="Employment Type"
        options={employmentOptions}
        placeholder="Full time, part time, ..."
        name="employmentType"
        // sx={{ zIndex: "999999 !important" }}
      />
      import {useDispatch} from 'react-redux';
      <Controller
        as={Form.Checkbox}
        error={getErrors(errors, "isVoluntary")}
        name="isVoluntary"
        label="This a volunteering role"
      />
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Start Date</label>
          <Controller
            name="startDate"
            required
            render={props => (
              <ReactDatePicker
                // sx={datePickerStyle}
                className="input"
                placeholderText="Choose start date"
                dateFormat="MM/yyy"
                showMonthYearPicker
                onChange={e => props.onChange(e)}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
        <Form.Field>
          <label>End Date (leave empty for ongoing)</label>
          <Controller
            name="endDate"
            render={props => (
              <ReactDatePicker
                // sx={datePickerStyle}
                className="input"
                placeholderText="Ongoing"
                isClearable
                dateFormat="MM/yyy"
                showMonthYearPicker
                onChange={e => {
                  props.onChange(e);
                  console.log(e);
                }}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Attached Media</label>
        <ChooseMedia />
      </Form.Field>
      {/* "Tell us about it!" */}
      <Controller
        as={Form.Input}
        error={getErrors(errors, "details")}
        name="details"
        label="Details"
        placeholder="Quiddich Player of the Season, 2019"
      />
    </Box>
  );
};

const forms = {
  education: {
    content: <EducationForm />,
    title: "Education",
    defaultValues: {
      school: "",
      fieldOfStudy: "",
      degree: "",
      location: "",
      grade: "",
      isVoluntary: false,
      startDate: null,
      endDate: null,
      media: [],
      details: "",
    },
    // TODO: callback: ,
  },
  experience: {
    content: <ExperienceForm />,
    title: "Experience",
    defaultValues: {
      jobTitle: "",
      organisation: "",
      department: "",
      location: "",
      employmentType: "",
      isVoluntary: false,
      startDate: null,
      endDate: null,
      media: [],
      details: "",
    },
    // TODO: callback: ,
  },
  display: {
    content: <DisplayForm />,
    title: "Display",
    defaultValues: { header: "", body: "", media: [], orientation: "center" },
    validate: (data, setError) => {
      if (data.header === "" && data.body === "") {
        setError("body", {
          type: "manual",
          message: "At least one field should be filled.",
        });
        setError("header", {
          type: "manual",
          message: "At least one field should be filled.",
        });
        return false;
      }
      return true;
    },
    // TODO: callback: ,
  },
};

export const ArtifactForm = ({ open, closeModal, currentlyEditing }) => {
  const { isNew, ...others } = currentlyEditing;
  return isNew ? (
    <NewArtifactForm open={open} closeModal={closeModal} currentlyEditing />
  ) : (
    <EditArtifactForm open={open} closeModal={closeModal} currentlyEditing />
  );
};

const NewArtifactForm = ({ open, closeModal, currentlyEditing }) => {
  const dispatch = useDispatch();
  const { type, pageId } = currentlyEditing;

  const thisForm = forms[type];
  if (!thisForm) return null; // invalid type! (no form yet...)

  // TODO: dirty check
  const closeButton = (
    <Button
      icon
      color="red"
      labelPosition="left"
      onClick={() => closeModal(false)}
    >
      <Icon name="cancel" />
      Cancel
    </Button>
  );

  const action = ({ media = [], ...contents }) =>
    dispatch(createArtifact(pageId, { type, media, contents }));

  return (
    <FormModal
      {...thisForm}
      action={action}
      title={"Create new ".concat(thisForm.title)}
      type={type}
      open={open}
      closeModal={closeModal}
      altAction={closeButton}
    />
  );
};

const EditArtifactForm = ({ currentlyEditing, open, closeModal }) => {
  const dispatch = useDispatch();

  const { type, id, media } = currentlyEditing;
  const contents = {
    ...currentlyEditing.contents,
    media,
  };

  const thisForm = forms[type];
  if (!thisForm) return null;

  const deleteButton = (
    <DeleteConfirmationModal
      setParentOpen={() => closeModal(false)}
      action={() => dispatch(deleteArtifact(id))}
      name="this artifact"
      button="true"
    />
  );

  return (
    <FormModal
      {...thisForm}
      action={data => dispatch(editArtifact(id, data))}
      title={"Edit ".concat(thisForm.title)}
      defaultValues={contents}
      altAction={deleteButton}
      open={open}
      closeModal={closeModal}
    />
  );
};

// content: the actual form
const FormModal = ({
  open,
  closeModal,
  title,
  defaultValues = {},
  action,
  content,
  type,
  validate = (data, setError) => true,
  altAction,
}) => {
  // eslint-disable-next-line
  const form = useForm({ defaultValues });
  const { handleSubmit, setValue, triggerValidation, setError } = form;

  const onSubmit = (data, e) => {
    if (validate(data, setError)) {
      // e.preventDefault();
      console.log("Submit event", e);
      console.log(data);
      if (action) action(data);
      closeModal();
    }
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
        closeOnDimmerClick={false}
        onClose={() => closeModal()}
        open={open}
        as={Form}
        onSubmit={handleSubmit(onSubmit)}
        dimmer={{ inverted: true }}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>{content}</Modal.Content>
        <Modal.Actions>
          {altAction}
          <Button icon color="blue" type="submit" labelPosition="left">
            <Icon name="checkmark" />
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    </FormProvider>
  );
};

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

export default ArtifactForm;
