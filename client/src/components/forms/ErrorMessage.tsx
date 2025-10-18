import React from "react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`bg-red-50 border border-red-200 rounded-md p-4 ${className}`}
    >
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
