import React from "react";
import { Input } from "../ui/input";
import { FormField } from "./FormField";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  min?: string;
  className?: string;
}

export function FormInput({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  min,
  className = "",
}: FormInputProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
      />
    </FormField>
  );
}
