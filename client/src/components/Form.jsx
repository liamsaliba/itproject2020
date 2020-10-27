/** @jsx jsx */
import { jsx } from "theme-ui";

import { useFormContext, Controller } from "react-hook-form";

import { Form, Icon, Checkbox } from "semantic-ui-react";
import { isTrue } from "../helpers";
import { ChooseMedia } from "./Media";

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
          required
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
          iconPosition="left"
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
