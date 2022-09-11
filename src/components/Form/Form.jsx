import React, { useState } from "react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { selectOptionsDesign } from "./selectOptionsDesign";
import "./form.css";

const selectStyle = {
  option: (styles) => ({ ...styles, textTransform: "capitalize" }),
  control: (styles) => ({
    ...styles,
    padding: "0.1rem 0rem",
    borderColor: "#d0d0d0",
    textTransform: "capitalize",
  }),
};

const Form = ({ use, isLoading, submitButton, fields, pattern }) => {
  const { control, register, handleSubmit, errors, onSubmit } = use;
  const [selectedOption, setSelectedOption] = useState(null);
  const input = (field) => {
    switch (field.type) {
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            {...register(field.name, {
              required: field.required,
              pattern: field.pattern ? pattern : /[\s\S]*/,
            })}
            placeholder=" "
          />
        );
      case "file":
        return (
          <input
            type={field.type}
            name={field.name}
            {...register(field.name, {
              required: field.required,
            })}
            placeholder=" "
            multiple={field.multiple}
          />
        );
      case "select":
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  {...field}
                  value={value}
                  defaultValue={selectedOption}
                  onChange={onChange}
                  placeholder="Categories"
                  options={selectOptionsDesign}
                  styles={selectStyle}
                />
              );
            }}
          />
        );
    }
  };
  useEffect(() => {});
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="apiForm" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {fields.map((field) => (
        <div
          className={
            field.divClassName
              ? `wrapper-input ${field.divClassName}`
              : "wrapper-input"
          }
          key={field.id}
        >
          {input(field)}
          {field.type !== "select" && (
            <label htmlFor={field.name}>{field.name}</label>
          )}
          {errors[field.name] && <span className="error">{field.error}</span>}
        </div>
      ))}
      <div className="submit">
        <input
          type="submit"
          value={isLoading ? "loading..." : submitButton}
          className="submit"
        />
      </div>
    </form>
  );
};

export default Form;
