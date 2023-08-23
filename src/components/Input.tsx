"use client";
import { InputText, InputTextProps } from "primereact/inputtext";

interface InputProps {
  id: string;
  label: string;
  className?: string;
  inputTextProps?: InputTextProps;
}
export const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  inputTextProps,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <InputText id={id} className="w-full" {...inputTextProps} />
    </div>
  );
};
