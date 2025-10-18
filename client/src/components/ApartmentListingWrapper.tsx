"use client";

import { Suspense } from "react";
import { ApartmentListingPage } from "./ApartmentListingPage";
import { LoadingGrid } from "./ui/loading";

function ApartmentListingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 space-y-4">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <LoadingGrid count={10} />
      </div>
    </div>
  );
}

export function ApartmentListingWrapper() {
  return (
    <Suspense fallback={<ApartmentListingFallback />}>
      <ApartmentListingPage />
    </Suspense>
  );
}
