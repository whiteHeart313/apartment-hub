"use client";

import { useApartmentFilters } from "../hooks/useApartmentFilters";
import { ApartmentListingHeader } from "./ApartmentListingHeader";
import { ApartmentListingContent } from "./ApartmentListingContent";
import { SearchBar } from "./SearchBar";

export function ApartmentListingPage() {
  const {
    apartments,
    projects,
    loading,
    error,
    pagination,
    hasMore,
    perPage,
    filters,
    handleSearch,
    handleProjectFilter,
    handleApartmentClick,
    handleLoadMore,
    refetch,
  } = useApartmentFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <ApartmentListingHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchQuery={filters.searchQuery}
          setSearchQuery={handleSearch}
          filterProject={filters.filterProject}
          setFilterProject={handleProjectFilter}
          projects={projects}
        />

        <ApartmentListingContent
          apartments={apartments}
          loading={loading}
          error={error}
          hasMore={hasMore}
          perPage={perPage}
          page={filters.page}
          pagination={pagination}
          onApartmentClick={handleApartmentClick}
          onLoadMore={handleLoadMore}
          onRetry={refetch}
        />
      </div>
    </div>
  );
}
