"use client";

import { useState } from "react";
import { ApartmentListingPage } from "../components/ApartmentListingPage";
import { ApartmentDetailsPage } from "../components/ApartmentDetailsPage";
import { apartments } from "../data/apartments";

export default function Home() {
  const [selectedApartmentId] = useState<string | null>(null);

  const selectedApartment = apartments.find(
    (apt) => apt.id === selectedApartmentId,
  );

  return (
    <div>
      {selectedApartment ? (
        <ApartmentDetailsPage apartment={selectedApartment} />
      ) : (
        <ApartmentListingPage />
      )}
    </div>
  );
}
