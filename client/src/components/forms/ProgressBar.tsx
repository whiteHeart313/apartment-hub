import React from "react";

interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  progress,
  label = "Progress",
  className = "",
}: ProgressBarProps) {
  if (progress <= 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
