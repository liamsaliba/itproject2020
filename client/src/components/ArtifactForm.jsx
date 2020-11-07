/** @jsx jsx */
import { jsx, Box } from "theme-ui";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";
// used https://codesandbox.io/s/semantic-ui-react-form-hooks-vnyjh?from-embed=&file=/example.js:594-698
// for react-form-hooks w semantic ui example

import {
  Button,
  Form,
  Modal,
  Icon,
  Divider,
  Accordion,
} from "semantic-ui-react";

import ReactDatePicker from "react-datepicker";
import { createArtifact, deleteArtifact, editArtifact } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  ControlledSelect,
  ControlledChooseMedia,
  getErrors,
  ControlledCheckbox,
} from "./Form";
import { DeleteConfirmationModal, useAsync } from "./Modals";

const MediaForm = () => (
  <Form.Field>
    <label>Media</label>
    <ControlledChooseMedia />
  </Form.Field>
);

const ActionForm = ({ collapsible = false }) => {
  const { errors } = useFormContext();
  const [open, setOpen] = useState(!collapsible);

  return (
    <Accordion>
      <Accordion.Title
        as="h3"
        active={open}
        index={0}
        onClick={() => setOpen(!open)}
      >
        <Icon name={collapsible ? "dropdown" : "linkify"} />
        Action button (optional)
      </Accordion.Title>
      <Accordion.Content active={open}>
        <Form.Group widths="equal">
          <Controller
            as={Form.Input}
            error={getErrors(errors, "actionText")}
            name="actionText"
            label="Button text"
            placeholder="Action text"
            iconPosition="left"
            icon="text cursor"
          />
          <Controller
            as={Form.Input}
            error={getErrors(errors, "actionUrl")}
            name="actionUrl"
            label="Button link"
            placeholder="http://..."
            iconPosition="left"
            icon="linkify"
            type="url"
          />
        </Form.Group>
      </Accordion.Content>
    </Accordion>
  );
};

const sizeOptions = [
  { key: "a", text: "Automatic", value: "auto" },
  { key: "s", text: "Short", value: "short" },
  { key: "m", text: "Medium", value: "medium" },
  { key: "t", text: "Tall", value: "tall" },
  { key: "f", text: "Fullscreen", value: "fullscreen" },
];

const displayOptions = [
  { key: "fit", text: "Fit", value: "contain" },
  { key: "fill", text: "Fill", value: "cover" },
];

const orientationOptions = [
  { key: "l", text: "Media on left", value: "left", icon: "align left" },
  {
    key: "c",
    text: "Media behind",
    value: "center",
    icon: "align center",
  },
  {
    key: "r",
    text: "Media on right",
    value: "right",
    icon: "align right",
  },
];

const textAlignOptions = [
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

const DisplayPropertiesForm = ({ media, body, collapsible = false }) => {
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(!collapsible);

  useEffect(() => {
    if (media.length === 0) {
      setValue("orientation", "center");
    }
  }, [media, setValue]);

  return (
    <Accordion>
      <Accordion.Title
        as="h3"
        active={open}
        index={0}
        onClick={() => (collapsible ? setOpen(!open) : null)}
      >
        <Icon name={collapsible ? "dropdown" : "image"} />
        Display Settings
      </Accordion.Title>
      <Accordion.Content active={open}>
        <Form.Group widths="equal">
          <ControlledSelect
            name="orientation"
            options={orientationOptions}
            rules={{ required: true }}
            label="Media Alignment"
            disabled={media.length === 0}
          />
          <ControlledSelect
            name="displayType"
            options={displayOptions}
            rules={{ required: true }}
            label="Display Type"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <ControlledSelect
            name="textAlign"
            options={textAlignOptions}
            rules={{ required: true }}
            disabled={body === ""}
            label="Text Alignment"
          />
          <ControlledSelect
            name="displaySize"
            options={sizeOptions}
            rules={{ required: true }}
            label="Display size"
          />
        </Form.Group>
      </Accordion.Content>
    </Accordion>
  );
};

const HeadingForm = () => {
  const { errors, watch } = useFormContext();

  const media = watch("media");
  const body = watch(["header"]);
  const bodyText = Object.values(body).join("");

  return (
    <Box>
      <Controller
        as={Form.Input}
        placeholder="A big headline"
        error={getErrors(errors, "header")}
        name="header"
        label="Header"
        size="large"
        icon="heading"
        iconPosition="left"
      />
      <MediaForm />
      <Divider />
      <DisplayPropertiesForm media={media} body={bodyText} />
    </Box>
  );
};

//https://www.youtube.com/embed/e-QFj59PON4
const EmbedForm = () => {
  const { errors } = useFormContext();

  return (
    <Box>
      <Controller
        as={Form.Input}
        rules={{ required: true }}
        placeholder="https://www.youtube.com/watch?v=e-QFj59PON4"
        error={getErrors(errors, "url")}
        name="url"
        label="Embed code"
        size="large"
        icon="video"
        iconPosition="left"
      />
      <Divider />
      <ControlledSelect
        name="displaySize"
        options={sizeOptions}
        rules={{ required: true }}
        label="Display size"
      />
    </Box>
  );
};

const DisplayForm = () => {
  const { errors, watch } = useFormContext();

  const media = watch("media");
  const body = watch(["header", "body", "actionText", "actionUrl"]);
  const bodyText = Object.values(body).join("");

  return (
    <Box>
      <Controller
        as={Form.Input}
        placeholder="A big headline"
        error={getErrors(errors, "header")}
        name="header"
        label="Header"
        size="large"
        icon="heading"
        iconPosition="left"
      />
      <Controller
        as={Form.TextArea}
        placeholder="Some text that's interesting."
        name="body"
        label="Body"
        error={getErrors(errors, "body")}
        iconPosition="left"
        icon="paragraph"
      />
      <MediaForm />
      <Divider />
      <ActionForm />
      <Divider />
      <DisplayPropertiesForm media={media} body={bodyText} />
    </Box>
  );
};

const EducationForm = () => {
  const { errors, watch } = useFormContext();

  const media = watch("media");

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
                dateFormat="MM/yyyy"
                showMonthYearPicker
                onChange={e => {
                  props.onChange(e);
                }}
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
                dateFormat="MM/yyyy"
                showMonthYearPicker
                onChange={e => props.onChange(e)}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
      </Form.Group>
      <MediaForm />

      <Controller
        as={Form.TextArea}
        error={getErrors(errors, "details")}
        name="details"
        label="Details"
        placeholder="Quiddich Player of the Season, 2019"
      />

      <Divider />
      <DisplayPropertiesForm media={media} collapsible />
    </Box>
  );
};

const ExperienceForm = () => {
  const { errors, watch } = useFormContext();

  const media = watch("media");

  const employmentOptions = [
    { key: "f", text: "Full Time", value: "Full Time" },
    { key: "p", text: "Part Time", value: "Part Time" },
    { key: "c", text: "Casual", value: "Casual" },
    { key: "s", text: "Self-employed", value: "Self-employed" },
    { key: "fl", text: "Freelance", value: "Freelance" },
    { key: "i", text: "Internship", value: "Internship" },
  ];
  return (
    <Box>
      <Controller
        as={Form.Input}
        clear
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
      <ControlledSelect
        name="employmentType"
        options={employmentOptions}
        rules={{ required: true }}
        label="Employment Type"
        placeholder="Full time, part time, ..."
      />
      <ControlledCheckbox name="isVoluntary" label="This a volunteering role" />
      <Form.Group widths="equal">
        <Form.Field required>
          <label>Start Date</label>
          <Controller
            name="startDate"
            required
            render={props => {
              return (
                <ReactDatePicker
                  // sx={datePickerStyle}
                  className="input"
                  placeholderText="Choose start date"
                  dateFormat="MM/yyy"
                  showMonthYearPicker
                  onChange={e => props.onChange(e)}
                  selected={props.value}
                />
              );
            }}
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
                }}
                selected={props.value}
              />
            )}
          />
        </Form.Field>
      </Form.Group>
      <MediaForm />
      <Controller
        as={Form.TextArea}
        error={getErrors(errors, "details")}
        name="details"
        label="Details"
        placeholder="Quiddich Player of the Season, 2019"
      />
      <Divider />
      <DisplayPropertiesForm media={media} collapsible />
    </Box>
  );
};

const actionDefaults = {
  actionText: "",
  actionUrl: "",
};

const mediaDefaults = {
  media: [],
};

const displayDefaults = {
  orientation: "center",
  displayType: "contain",
  displaySize: "auto",
  textAlign: "center",
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
      startDate: null,
      endDate: null,
      details: "",
      ...displayDefaults,
      ...mediaDefaults,
    },
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
      details: "",
      ...displayDefaults,
      ...mediaDefaults,
    },
  },
  display: {
    content: <DisplayForm />,
    title: "Display",
    defaultValues: {
      header: "",
      body: "",
      ...displayDefaults,
      ...mediaDefaults,
      ...actionDefaults,
    },
    validate: (data, setError) => {
      if (
        data.header === "" &&
        data.body === "" &&
        data.media.length === 0 &&
        data.actionText === "" &&
        data.actionUrl === ""
      ) {
        setError("header", {
          type: "manual",
          message: "At least one field should be filled.",
        });
        return false;
      }
      if (data.actionText !== "" && data.actionUrl === "") {
        setError("buttonURL", {
          type: "manual",
          message: "Button with label needs a URL.",
        });
        return false;
      }
      if (data.actionText === "" && data.actionUrl !== "") {
        setError("actionText", {
          type: "manual",
          message: "Button with URL needs a label.",
        });
        return false;
      }
      return true;
    },
  },
  embed: {
    content: <EmbedForm />,
    title: "Embed",
    defaultValues: {
      url: "",
      displaySize: "auto",
    },
  },
  heading: {
    content: <HeadingForm />,
    title: "Heading",
    defaultValues: {
      header: "",
      ...displayDefaults,
      ...mediaDefaults,
    },
  },
};

export const ArtifactForm = ({
  open,
  closeModal,
  currentlyEditing,
  loading,
}) => {
  if (currentlyEditing === null) return null;

  const { isNew, ...others } = currentlyEditing;
  return isNew ? (
    <NewArtifactForm
      open={open}
      closeModal={closeModal}
      currentlyEditing={others}
      loading={loading}
    />
  ) : (
    <EditArtifactForm
      open={open}
      closeModal={closeModal}
      currentlyEditing={others}
      loading={loading}
    />
  );
};

const modalSize = type => (["markdown"].includes(type) ? "large" : "small");

const NewArtifactForm = ({
  open,
  closeModal,
  currentlyEditing,
  loading,
  error,
}) => {
  const dispatch = useDispatch();
  const { type, pageId } = currentlyEditing;

  const thisForm = forms[type];
  if (!thisForm) return null; // invalid type! (no form yet...)

  // TODO: dirty check
  const closeButton = (
    <Button icon color="red" labelPosition="left" onClick={closeModal}>
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
      loading={loading}
      error={error}
      size={modalSize(type)}
    />
  );
};

const fixDate = date => {
  if (date) {
    if (date === "") return null;
    if (Number.isInteger(date)) return date;
    return Date.parse(date);
  }
  return undefined;
};

const fixDates = contents => {
  return {
    startDate: fixDate(contents.startDate),
    endDate: fixDate(contents.endDate),
  };
};

const EditArtifactForm = ({
  currentlyEditing,
  open,
  closeModal,
  loading,
  error,
}) => {
  const dispatch = useDispatch();

  const { type, id, media } = currentlyEditing;

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const contents = {
    ...currentlyEditing.contents,
    media: media.map(m => m.id),
    ...fixDates(currentlyEditing.contents),
  };

  const thisForm = forms[type];
  if (!thisForm) return null;

  const deleteButton = (
    <React.Fragment>
      <DeleteConfirmationModal
        text={"Delete"}
        action={() => {
          dispatch(deleteArtifact(id));
          closeModal();
        }}
      />
      {/* <Button
        icon
        color="red"
        labelPosition="left"
        onClick={() => {
          dispatch(deleteArtifact(id));
          closeModal();
        }}
      >
        <Icon name="trash" />
        Delete
      </Button> */}
      <Button icon labelPosition="left" onClick={() => closeModal()}>
        <Icon name="cancel" />
        Discard Changes
      </Button>
    </React.Fragment>
  );

  const action = ({ media = [], ...contents }) =>
    dispatch(editArtifact(id, { type, media, contents }));

  return (
    <FormModal
      {...thisForm}
      action={action}
      title={"Edit ".concat(thisForm.title)}
      defaultValues={contents}
      altAction={deleteButton}
      open={open}
      closeModal={closeModal}
      id={id}
      loading={loading}
      error={error}
      size={modalSize(type)}
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
  validate = (data, setError) => true,
  altAction,
  id,
  loading,
  error,
  size = "small",
}) => {
  // eslint-disable-next-line
  const { status, start } = useAsync(loading, error, () => null, closeModal);
  const form = useForm({ defaultValues });
  // const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    triggerValidation,
    setError,
    reset,
    watch,
    formState,
  } = form;
  const allFields = watch();
  const { isDirty } = formState;

  useEffect(() => {
    reset(defaultValues);
    console.log("form defaults", defaultValues);
    // eslint-disable-next-line
  }, [defaultValues]);

  useEffect(() => {
    console.log("form fields", allFields);
  });

  const onSubmit = data => {
    if (!isDirty) {
      closeModal();
    }

    if (validate(data, setError)) {
      // const { media, ...contents } = data;
      // if (action) action({ media, contents });
      if (action) action(data);

      start();
    }
  };

  const onChange = async (e, { name, value }) => {
    setValue(name, value);
    await triggerValidation({ name });
  };

  return (
    <FormProvider {...form} onChange={onChange}>
      <Modal
        size={size}
        closeIcon
        onClose={closeModal}
        closeOnDimmerClick={!isDirty}
        open={open}
        dimmer={{ inverted: true }}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
            }}
          >
            {content}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {altAction}
          <Button
            icon
            color="blue"
            type="submit"
            labelPosition="left"
            onClick={handleSubmit(onSubmit)}
            loading={loading || status !== "idle"}
          >
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
