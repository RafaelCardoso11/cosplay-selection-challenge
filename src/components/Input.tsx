"use client";
import { FormikProps } from "formik";
import { InputText, InputTextProps } from "primereact/inputtext";

interface InputProps {
  id: string;
  label: string;
  className?: string;
  inputTextProps?: InputTextProps;
  propsFormik?: FormikProps<any>;
}
export const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  inputTextProps,
  propsFormik,
}) => {
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
        onChange={propsFormik?.handleChange}
        onBlur={propsFormik?.handleBlur}
        value={propsFormik?.values[id]}
        className="w-full"
        {...inputTextProps}
      />
      {!propsFormik?.isSubmitting && (
        <small className="p-error">{propsFormik?.errors[id] as string}</small>
      )}
    </div>
  );
};
