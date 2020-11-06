/** @jsx jsx */
import { jsx } from "theme-ui";

import { useFormContext, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

import { Form, Icon, Checkbox, Button } from "semantic-ui-react";
import { isTrue } from "../helpers";
import { ChooseMedia } from "./Media";
import React, { useState } from "react";
import { DeleteConfirmationModal } from "./Modals";

export const getErrors = (errors, field) =>
  errors[field]
    ? {
        content: errors[field].message,
        pointing: "below",
      }
    : null;

export const Toggle = ({ value, setValue, icon, label }) => {
  const onChange = (_, { checked }) => {
    // set to the new value of checked
    setValue(checked.toString());
  };

  return (
    <Checkbox
      toggle
      onChange={onChange}
      checked={isTrue(value)}
      label={
        label || icon ? (
          <label>
            {icon ? <Icon name={icon} /> : null}
            {label}
          </label>
        ) : undefined
      }
    />
  );
};

export const ControlledCheckbox = ({
  name,
  label,
  rules,
  required,
  disabled = false,
}) => {
  return (
    <Controller
      rules={rules}
      name={name}
      render={({ onChange, value, name }) => (
        <Form.Checkbox
          iconPosition="left"
          fluid
          required={required}
          label={label}
          name={name}
          disabled={disabled}
          checked={value}
          onChange={(e, { checked }) => {
            onChange(checked);
          }}
        />
      )}
    />
  );
};

export const ControlledSelect = ({
  name,
  options,
  label,
  rules,
  defaultIcon,
  disabled = false,
}) => {
  const { errors } = useFormContext();
  const icons = Object.fromEntries(
    options.map(option => [option.value, option.icon])
  );

  return (
    <Controller
      error={getErrors(errors, name)}
      rules={rules}
      name={name}
      render={({ onChange, value, name }) => (
        <Form.Select
          fluid
          required
          label={label}
          options={options}
          name={name}
          disabled={disabled}
          value={value}
          icon={icons[value] || defaultIcon}
          onChange={(e, { value }) => {
            onChange(value);
          }}
        />
      )}
    />
  );
};

export const ControlledChooseMedia = () => (
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
);

export const EditableField = ({
  id,
  icon = null,
  loading = false,
  value: oldValue,
  update,
  del,
  placeholder = "Value",
  emptyPlaceholder = placeholder,
  maxLength = null,
  pages,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(oldValue);
  const [error, setError] = useState(false);
  const [initialName, setInitialName] = useState(null);
  const nameExists = () => {
    setError(true);
    setEditing(true);
  };
  const changeName = value => {
    setError(false);
    update(value);
    setEditing(false);
  };

  // Get all the pages

  return (
    <Form.Input
      sx={{ overflowWrap: "break-word" }}
      name={id}
      loading={loading}
      maxLength={maxLength}
      fluid
      icon={icon}
      iconPosition={icon ? "left" : null}
      onChange={(e, { value }) => setValue(value)}
      placeholder={editing ? placeholder : emptyPlaceholder}
      value={value}
      error={
        error
          ? {
              content: "Page name must be unique.",
              pointing: "below",
            }
          : false
      }
      transparent={!editing}
      readOnly={!editing}
      action={
        editing ? (
          <React.Fragment>
            <Button
              icon="cancel"
              type="button"
              negative
              onClick={() => {
                setError(false);
                setValue(oldValue);
                setEditing(false);
              }}
            />
            <Button
              icon="checkmark"
              type="button"
              positive
              onClick={() => {
                {
                  value !== initialName &&
                  pages.map(page => page.name).includes(value)
                    ? nameExists()
                    : changeName(value);
                }
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              icon="pencil"
              type="button"
              onClick={() => {
                setEditing(true);
                setInitialName(value);
              }}
            />
            <DeleteConfirmationModal action={del} name={oldValue} />
          </React.Fragment>
        )
      }
    />
  );
};
