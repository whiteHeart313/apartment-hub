import { useState, useCallback } from "react";
import { ApartmentFormData } from "./useAddApartment";
import { sanitizeInput, sanitizeNumericInput } from "../utils/sanitize";

type ApartmentFormValue = string | string[] | File[];

interface UseApartmentFormProps {
  initialData?: Partial<ApartmentFormData>;
  onValidateField: (
    field: keyof ApartmentFormData,
    value: ApartmentFormValue,
    formData: ApartmentFormData,
  ) => void;
}

export function useApartmentForm({
  initialData = {},
  onValidateField,
}: UseApartmentFormProps) {
  const [formData, setFormData] = useState<ApartmentFormData>({
    unitName: "",
    unitNumber: "",
    project: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "1",
    area: "",
    description: "",
    status: "available",
    amenities: [],
    images: [],
    ...initialData,
  });

  const handleInputChange = useCallback(
    (field: keyof ApartmentFormData) => {
      return (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => {
        let value = e.target.value;

        // Sanitize input based on field type
        if (field === "price" || field === "area") {
          value = sanitizeNumericInput(value);
        } else if (typeof value === "string") {
          value = sanitizeInput(value);
        }

        const newFormData = { ...formData, [field]: value };
        setFormData(newFormData);

        // Validate field on change
        onValidateField(field, value, newFormData);
      };
    },
    [formData, onValidateField],
  );

  const handleAmenitiesChange = useCallback(
    (amenities: string[]) => {
      const newFormData = { ...formData, amenities };
      setFormData(newFormData);
    },
    [formData],
  );

  const handleImagesChange = useCallback(
    (images: File[]) => {
      const newFormData = { ...formData, images };
      setFormData(newFormData);
      onValidateField("images", images, newFormData);
    },
    [formData, onValidateField],
  );

  const resetForm = useCallback(() => {
    setFormData({
      unitName: "",
      unitNumber: "",
      project: "",
      address: "",
      price: "",
      bedrooms: "",
      bathrooms: "1",
      area: "",
      description: "",
      status: "available",
      amenities: [],
      images: [],
      ...initialData,
    });
  }, [initialData]);

  return {
    formData,
    setFormData,
    handleInputChange,
    handleAmenitiesChange,
    handleImagesChange,
    resetForm,
  };
}
