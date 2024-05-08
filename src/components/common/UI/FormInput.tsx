import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import _ from "lodash";

export const FormInput = ({
  label,
  register,
  fieldName,
  errors,
  type = "text",
}: {
  label: string;
  register: UseFormRegisterReturn<any>;
  fieldName: string;
  errors: FieldErrors;
  type?: "text" | "number" | "submit";
}) => {
  const fieldError = _.get(errors, fieldName);
  return (
    <div className="tw-mb-3 tw-w-full">
      <label htmlFor={fieldName} className="tw-block tw-pl-0.5">
        {label}
      </label>
      <input
        type={type}
        step={"0.0001"}
        className="tw-block tw-p-1.5 tw-rounded-md tw-border tw-border-slate-200 tw-shadow"
        {...register}
      />
      <p className="tw-block tw-w-full tw-text-inherit tw-text-sm tw-font-light tw-pl-1 tw-mt-0.5 tw-text-red-500">
        {fieldError ? `*${fieldError?.message}` : ""}
      </p>
    </div>
  );
};
