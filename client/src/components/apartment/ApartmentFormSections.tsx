import React from "react";
import { FormInput, FormSelect, FormTextarea } from "../forms";
import { AmenitiesInput } from "../AmenitiesInput";
import { ImageUpload } from "../ImageUpload";
import { ApartmentFormData } from "../../hooks/useAddApartment";

interface Project {
  id: number;
  name: string;
}

interface FormSectionProps {
  formData: ApartmentFormData;
  errors: Record<string, string>;
  onInputChange: (
    field: keyof ApartmentFormData,
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onAmenitiesChange: (amenities: string[]) => void;
  onImagesChange: (images: File[]) => void;
}

interface BasicInfoSectionProps extends FormSectionProps {
  projects: Project[];
  loadingProjects: boolean;
}

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "pending", label: "Pending" },
];

export function BasicInfoSection({
  formData,
  errors,
  onInputChange,
  projects,
  loadingProjects,
}: BasicInfoSectionProps) {
  const projectOptions = projects.map((project) => ({
    value: project.name,
    label: project.name,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Unit Name"
        id="unitName"
        value={formData.unitName}
        onChange={onInputChange("unitName")}
        placeholder="e.g., Garden View A-101"
        required
        error={errors.unitName}
      />

      <FormInput
        label="Unit Number"
        id="unitNumber"
        value={formData.unitNumber}
        onChange={onInputChange("unitNumber")}
        placeholder="e.g., A-101"
        required
        error={errors.unitNumber}
      />

      <FormSelect
        label="Project"
        id="project"
        value={formData.project}
        onChange={onInputChange("project")}
        options={projectOptions}
        placeholder="Select a project"
        required
        error={errors.project || errors.projects}
        loading={loadingProjects}
      />

      <FormSelect
        label="Status"
        id="status"
        value={formData.status}
        onChange={onInputChange("status")}
        options={statusOptions}
        required
        error={errors.status}
      />
    </div>
  );
}

export function AddressSection({
  formData,
  errors,
  onInputChange,
}: FormSectionProps) {
  return (
    <FormInput
      label="Address"
      id="address"
      value={formData.address}
      onChange={onInputChange("address")}
      placeholder="e.g., 123 Main St, Cityville"
      required
      error={errors.address}
    />
  );
}

export function NumericFieldsSection({
  formData,
  errors,
  onInputChange,
}: FormSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <FormInput
        label="Price"
        id="price"
        value={formData.price}
        onChange={onInputChange("price")}
        placeholder="120000.00"
        required
        error={errors.price}
      />

      <FormInput
        label="Bedrooms"
        id="bedrooms"
        type="number"
        value={formData.bedrooms}
        onChange={onInputChange("bedrooms")}
        placeholder="2"
        min="0"
        required
        error={errors.bedrooms}
      />

      <FormInput
        label="Bathrooms"
        id="bathrooms"
        type="number"
        value={formData.bathrooms}
        onChange={onInputChange("bathrooms")}
        placeholder="1"
        min="1"
        required
        error={errors.bathrooms}
      />

      <FormInput
        label="Area (sq ft)"
        id="area"
        value={formData.area}
        onChange={onInputChange("area")}
        placeholder="85.50"
        required
        error={errors.area}
      />
    </div>
  );
}

export function DescriptionSection({
  formData,
  errors,
  onInputChange,
}: FormSectionProps) {
  return (
    <FormTextarea
      label="Description"
      id="description"
      value={formData.description}
      onChange={onInputChange("description")}
      placeholder="Describe the apartment features, location benefits, etc."
      rows={4}
      required
      error={errors.description}
    />
  );
}

export function AmenitiesSection({
  formData,
  errors,
  onAmenitiesChange,
}: FormSectionProps) {
  return (
    <AmenitiesInput
      amenities={formData.amenities}
      onAmenitiesChange={onAmenitiesChange}
      error={errors.amenities}
    />
  );
}

export function ImagesSection({
  formData,
  errors,
  onImagesChange,
}: FormSectionProps) {
  return (
    <ImageUpload
      images={formData.images}
      onImagesChange={onImagesChange}
      error={errors.images}
    />
  );
}
