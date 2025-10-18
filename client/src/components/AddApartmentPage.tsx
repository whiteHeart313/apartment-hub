"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ImageUpload } from "./ImageUpload";
import { AmenitiesInput } from "./AmenitiesInput";
import { useAddApartment, ApartmentFormData } from "../hooks/useAddApartment";
import { sanitizeInput, sanitizeNumericInput } from "../utils/sanitize";

const statusOptions = [
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "pending", label: "Pending" },
];

export function AddApartmentPage() {
  const router = useRouter();
  const {
    isSubmitting,
    errors,
    uploadProgress,
    submitApartment,
    validateField,
    setErrors,
    projects,
    loadingProjects,
  } = useAddApartment();

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
        validateField(field, value, newFormData);
      };
    },
    [formData, validateField],
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
      validateField("images", images, newFormData);
    },
    [formData, validateField],
  );

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
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Apartment
            </h1>
            <p className="text-gray-600 mt-1">
              Fill in the details to add a new apartment to the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unitName">
                  Unit Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="unitName"
                  type="text"
                  value={formData.unitName}
                  onChange={handleInputChange("unitName")}
                  placeholder="e.g., Garden View A-101"
                  required
                />
                {errors.unitName && (
                  <p className="text-sm text-red-600">{errors.unitName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitNumber">
                  Unit Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="unitNumber"
                  type="text"
                  value={formData.unitNumber}
                  onChange={handleInputChange("unitNumber")}
                  placeholder="e.g., A-101"
                  required
                />
                {errors.unitNumber && (
                  <p className="text-sm text-red-600">{errors.unitNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">
                  Project <span className="text-red-500">*</span>
                </Label>
                {loadingProjects ? (
                  <div className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm items-center">
                    Loading projects...
                  </div>
                ) : (
                  <select
                    id="project"
                    value={formData.project}
                    onChange={handleInputChange("project")}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.name}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.project && (
                  <p className="text-sm text-red-600">{errors.project}</p>
                )}
                {errors.projects && (
                  <p className="text-sm text-red-600">{errors.projects}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange("status")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-sm text-red-600">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleInputChange("address")}
                placeholder="e.g., 123 Main St, Cityville"
                required
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Numeric Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="text"
                  value={formData.price}
                  onChange={handleInputChange("price")}
                  placeholder="120000.00"
                  required
                />
                {errors.price && (
                  <p className="text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">
                  Bedrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={handleInputChange("bedrooms")}
                  placeholder="2"
                  min="0"
                  required
                />
                {errors.bedrooms && (
                  <p className="text-sm text-red-600">{errors.bedrooms}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">
                  Bathrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={handleInputChange("bathrooms")}
                  placeholder="1"
                  min="1"
                  required
                />
                {errors.bathrooms && (
                  <p className="text-sm text-red-600">{errors.bathrooms}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">
                  Area (sq ft) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="area"
                  type="text"
                  value={formData.area}
                  onChange={handleInputChange("area")}
                  placeholder="85.50"
                  required
                />
                {errors.area && (
                  <p className="text-sm text-red-600">{errors.area}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange("description")}
                placeholder="Describe the apartment features, location benefits, etc."
                rows={4}
                required
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Amenities */}
            <AmenitiesInput
              amenities={formData.amenities}
              onAmenitiesChange={handleAmenitiesChange}
              error={errors.amenities}
            />

            {/* Images */}
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              error={errors.images}
            />

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Upload Progress
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-32"
              >
                {isSubmitting ? "Creating..." : "Create Apartment"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
