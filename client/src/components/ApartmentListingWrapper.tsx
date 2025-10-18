"use client";

import { Suspense } from "react";
import { ApartmentListingPage } from "./ApartmentListingPage";
import { LoadingGrid } from "./ui/loading";

function ApartmentListingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

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
