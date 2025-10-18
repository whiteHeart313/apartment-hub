import React from "react";
import { Textarea } from "../ui/textarea";
import { FormField } from "./FormField";

interface FormTextareaProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

export function FormTextarea({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
  className = "",
}: FormTextareaProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    </FormField>
  );
}
