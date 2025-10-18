import React from "react";
import { Button } from "../ui/button";

interface ApartmentFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

export function ApartmentFormActions({
  isSubmitting,
  onCancel,
}: ApartmentFormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} className="min-w-32">
        {isSubmitting ? "Creating..." : "Create Apartment"}
      </Button>
    </div>
  );
}
