"use client";

import React, { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sanitizeInput } from "../utils/sanitize";

interface AmenitiesInputProps {
  amenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
  error?: string;
}

export function AmenitiesInput({
  amenities,
  onAmenitiesChange,
  error,
}: AmenitiesInputProps) {
  const [newAmenity, setNewAmenity] = useState("");

  const addAmenity = useCallback(() => {
    const sanitized = sanitizeInput(newAmenity);
    if (sanitized && !amenities.includes(sanitized)) {
      onAmenitiesChange([...amenities, sanitized]);
      setNewAmenity("");
    }
  }, [newAmenity, amenities, onAmenitiesChange]);

  const removeAmenity = useCallback(
    (index: number) => {
      const newAmenities = amenities.filter((_, i) => i !== index);
      onAmenitiesChange(newAmenities);
    },
    [amenities, onAmenitiesChange],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addAmenity();
      }
    },
    [addAmenity],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = sanitizeInput(e.target.value);
      setNewAmenity(sanitized);
    },
    [],
  );

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Amenities</label>

      {/* Add new amenity */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Add amenity (e.g., Parking, Pool, Gym)"
          value={newAmenity}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={addAmenity}
          disabled={!newAmenity.trim()}
          variant="outline"
        >
          Add
        </Button>
      </div>

      {/* Display amenities */}
      {amenities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{amenity}</span>
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
