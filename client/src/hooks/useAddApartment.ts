"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apartmentService } from "../services/apartmentService";
import { Apartment } from "../types/apartment";

export interface ApartmentFormData {
  unitName: string;
  unitNumber: string;
  project: string;
  address: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  description: string;
  status: "available" | "rented" | "pending";
  amenities: string[];
  images: File[];
}

export interface FormErrors {
  [key: string]: string;
}

export function useAddApartment() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const validateForm = useCallback((data: ApartmentFormData): FormErrors => {
    const errors: FormErrors = {};

    // Required field validation
    if (!data.unitName.trim()) errors.unitName = "Unit name is required";
    if (!data.unitNumber.trim()) errors.unitNumber = "Unit number is required";
    if (!data.project.trim()) errors.project = "Project is required";
    if (!data.address.trim()) errors.address = "Address is required";
    if (!data.description.trim())
      errors.description = "Description is required";

    // Numeric validation
    const price = parseFloat(data.price);
    if (!data.price || isNaN(price) || price <= 0) {
      errors.price = "Price must be a valid positive number";
    }

    const bedrooms = parseInt(data.bedrooms);
    if (!data.bedrooms || isNaN(bedrooms) || bedrooms < 0) {
      errors.bedrooms = "Bedrooms must be a valid number";
    }

    const bathrooms = parseInt(data.bathrooms);
    if (!data.bathrooms || isNaN(bathrooms) || bathrooms < 1) {
      errors.bathrooms = "Bathrooms must be at least 1";
    }

    const area = parseFloat(data.area);
    if (!data.area || isNaN(area) || area <= 0) {
      errors.area = "Area must be a valid positive number";
    }

    // Length validation
    if (data.unitName.length < 3)
      errors.unitName = "Unit name must be at least 3 characters";
    if (data.description.length < 10)
      errors.description = "Description must be at least 10 characters";
    if (data.address.length < 10)
      errors.address = "Address must be at least 10 characters";

    // Image validation
    if (data.images.length > 4) {
      errors.images = "Maximum 4 images allowed";
    }

    // Validate image types and sizes
    for (const image of data.images) {
      if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
        errors.images = "Only JPEG, PNG, and WebP images are allowed";
        break;
      }
      if (image.size > 5 * 1024 * 1024) {
        // 5MB
        errors.images = "Each image must be less than 5MB";
        break;
      }
    }

    return errors;
  }, []);

  const uploadImages = useCallback(
    async (images: File[]): Promise<string[]> => {
      if (images.length === 0) return [];

      try {
        return await apartmentService.uploadImages(images);
      } catch {
        throw new Error("Failed to upload images");
      }
    },
    [],
  );

  const submitApartment = useCallback(
    async (formData: ApartmentFormData): Promise<boolean | undefined> => {
      setIsSubmitting(true);
      setErrors({});
      setUploadProgress(0);

      try {
        // Validate form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        // Upload images first
        setUploadProgress(25);
        const imageUrls = await uploadImages(formData.images);
        setUploadProgress(50);

        // Create apartment data
        const apartmentData: Omit<Apartment, "id"> = {
          unitName: formData.unitName.trim(),
          unitNumber: formData.unitNumber.trim(),
          project: formData.project.trim(),
          address: formData.address.trim(),
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          area: parseFloat(formData.area),
          description: formData.description.trim(),
          status: formData.status,
          amenities: formData.amenities.filter((a) => a.trim()),
          images: imageUrls,
        };

        setUploadProgress(75);

        // Create apartment
        await apartmentService.createApartment(apartmentData);

        setUploadProgress(100);

        // Redirect to apartments list
        router.push("/");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create apartment";
        setErrors({ submit: errorMessage });
      } finally {
        setIsSubmitting(false);
        setUploadProgress(0);
      }
    },
    [validateForm, uploadImages, router],
  );

  const validateField = useCallback(
    (
      field: keyof ApartmentFormData,
      value: string | string[] | File[],
      allData: ApartmentFormData,
    ) => {
      const fieldErrors = validateForm(allData);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErrors[field] || "",
      }));
    },
    [validateForm],
  );

  return {
    isSubmitting,
    errors,
    uploadProgress,
    submitApartment,
    validateField,
    setErrors,
  };
}
