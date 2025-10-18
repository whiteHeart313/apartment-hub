import React from "react";
import { FormField } from "./FormField";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  loading?: boolean;
  className?: string;
}

export function FormSelect({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  error,
  loading = false,
  className = "",
}: FormSelectProps) {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
      className={className}
    >
      {loading ? (
        <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm items-center">
          Loading...
        </div>
      ) : (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required={required}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FormField>
  );
}
