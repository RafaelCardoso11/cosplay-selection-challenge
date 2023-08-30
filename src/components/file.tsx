"use client";
import { initialValues } from "@/app/pages/judge/validations";
import { FormikProps } from "formik";
import { InputText, InputTextProps } from "primereact/inputtext";
import { ChangeEvent, useEffect, useState } from "react";

interface FileProps {
  id: string;
  label: string;
  className?: string;
  inputTextProps?: InputTextProps;
  propsFormik?: FormikProps<any>;
  accept: string;
}
export const File: React.FC<FileProps> = ({
  id,
  label,
  className,
  inputTextProps,
  propsFormik,
  accept,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      propsFormik?.setFieldValue(id, files[0]);
    } else {
      propsFormik?.setFieldValue(id, propsFormik.initialValues[id]);
    }
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {propsFormik?.errors[id] && (
          <small className="p-error text-sm">*</small>
        )}
      </label>

      <InputText
        id={id}
        accept={accept}
        type="file"
        onChange={handleChange}
        // value={fileName}
        className="w-full"
        {...inputTextProps}
      />
      <small className="p-error">{propsFormik?.errors[id] as string}</small>
    </div>
  );
};
