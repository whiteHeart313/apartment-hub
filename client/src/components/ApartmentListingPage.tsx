"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApartments } from "../hooks/useApartments";
import { ApartmentCard } from "./ApartmentCard";
import { SearchBar } from "./SearchBar";
import { LoadingGrid, LoadingSpinner } from "./ui/loading";
import { ErrorCard } from "./ui/error";
import { Button } from "./ui/button";
import { Building2 } from "lucide-react";

export function ApartmentListingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { apartments, loading, error, pagination, refetch, loadMore, hasMore } =
    useApartments({
      page,
      perPage,
      search: searchQuery || undefined,
      project: filterProject !== "all" ? filterProject : undefined,
    });

  const projects = useMemo(() => {
    // Extract unique projects from current apartments
    const uniqueProjects = new Set(apartments.map((apt) => apt.project));
    return Array.from(uniqueProjects);
  }, [apartments]);

  const handleApartmentClick = useCallback(
    (apartmentId: string) => {
      router.push(`/apartments/${apartmentId}`);
    },
    [router],
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const handleProjectFilter = useCallback((project: string) => {
    setFilterProject(project);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadMore();
    }
  }, [loading, hasMore, loadMore]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1>Apartment Listings</h1>
          </div>
          <p className="text-gray-600">Find your perfect home</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSearch}
          filterProject={filterProject}
          setFilterProject={handleProjectFilter}
          projects={projects}
        />

        {error && (
          <ErrorCard message={error} onRetry={refetch} className="mb-6" />
        )}

        {!error && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {loading && page === 1 ? (
                "Loading apartments..."
              ) : (
                <>
                  {apartments.length}{" "}
                  {apartments.length === 1 ? "apartment" : "apartments"} found
                  {pagination.total && ` of ${pagination.total} total`}
                </>
              )}
            </div>

            {loading && page === 1 ? (
              <LoadingGrid count={perPage} />
            ) : apartments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No apartments match your search criteria
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apartments.map((apartment) => (
                    <ApartmentCard
                      key={apartment.id}
                      apartment={apartment}
                      onClick={() => handleApartmentClick(apartment.id)}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-8 text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loading}
                      variant="outline"
                      className="min-w-32"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Loading...
                        </>
                      ) : (
                        "Load More"
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
