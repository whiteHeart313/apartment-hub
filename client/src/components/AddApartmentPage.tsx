"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAddApartment } from "../hooks/useAddApartment";
import { useApartmentForm } from "../hooks/useApartmentForm";
import { ProgressBar, ErrorMessage } from "./forms";
import {
  ApartmentFormHeader,
  ApartmentFormActions,
  BasicInfoSection,
  AddressSection,
  NumericFieldsSection,
  DescriptionSection,
  AmenitiesSection,
  ImagesSection,
} from "./apartment";

export function AddApartmentPage() {
  const router = useRouter();
  const {
    isSubmitting,
    errors,
    uploadProgress,
    submitApartment,
    validateField,
    projects,
    loadingProjects,
  } = useAddApartment();

  const {
    formData,
    handleInputChange,
    handleAmenitiesChange,
    handleImagesChange,
  } = useApartmentForm({
    onValidateField: validateField,
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await submitApartment(formData);
    },
    [formData, submitApartment],
  );

  const handleCancel = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <ApartmentFormHeader />

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <BasicInfoSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
              projects={projects}
              loadingProjects={loadingProjects}
            />

            <AddressSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
            />

            <NumericFieldsSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
            />

            <DescriptionSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
            />

            <AmenitiesSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
            />

            <ImagesSection
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onAmenitiesChange={handleAmenitiesChange}
              onImagesChange={handleImagesChange}
            />

            <ProgressBar progress={uploadProgress} label="Upload Progress" />

            <ErrorMessage message={errors.submit} />

            <ApartmentFormActions
              isSubmitting={isSubmitting}
              onCancel={handleCancel}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
