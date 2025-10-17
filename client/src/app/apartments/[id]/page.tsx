"use client";

import { useParams } from "next/navigation";
import { ApartmentDetailsPage } from "../../../components/ApartmentDetailsPage";
import { useApartment } from "../../../hooks/useApartments";
import { LoadingPage } from "../../../components/ui/loading";
import { ErrorPage } from "../../../components/ui/error";

export default function ApartmentDetails() {
  const params = useParams();
  const unitNumber = params.id as string;

  const { apartment, loading, error, refetch } = useApartment(unitNumber);

  if (loading) {
    return <LoadingPage message="Loading apartment details..." />;
  }

  if (error) {
    return (
      <ErrorPage
        title="Failed to load apartment"
        message={error}
        onRetry={refetch}
        retryLabel="Try again"
      />
    );
  }

  if (!apartment) {
    return (
      <ErrorPage
        title="Apartment not found"
        message="The apartment you're looking for doesn't exist or has been removed."
        onRetry={refetch}
        retryLabel="Go back"
      />
    );
  }

  return <ApartmentDetailsPage apartment={apartment} />;
}
