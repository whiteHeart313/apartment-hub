import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { APARTMENT_LISTING_CONFIG } from "../constants/apartmentListing";
import { FilterState } from "../types/apartmentListing";

export function useUrlFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [filterProject, setFilterProject] = useState(
    searchParams.get("project") ||
      APARTMENT_LISTING_CONFIG.DEFAULT_FILTER_PROJECT,
  );
  const [page, setPage] = useState(
    parseInt(
      searchParams.get("page") ||
        APARTMENT_LISTING_CONFIG.DEFAULT_PAGE.toString(),
    ),
  );

  // Function to update URL with current filters
  const updateURL = useCallback(
    (newSearchQuery: string, newFilterProject: string, newPage: number) => {
      const params = new URLSearchParams();

      if (newSearchQuery) {
        params.set("search", newSearchQuery);
      }

      if (
        newFilterProject !== APARTMENT_LISTING_CONFIG.DEFAULT_FILTER_PROJECT
      ) {
        params.set("project", newFilterProject);
      }

      if (newPage > APARTMENT_LISTING_CONFIG.DEFAULT_PAGE) {
        params.set("page", newPage.toString());
      }

      const queryString = params.toString();
      const newUrl = queryString ? `/?${queryString}` : "/";

      router.push(newUrl, { scroll: false });
    },
    [router],
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setPage(APARTMENT_LISTING_CONFIG.DEFAULT_PAGE);
      updateURL(query, filterProject, APARTMENT_LISTING_CONFIG.DEFAULT_PAGE);
    },
    [filterProject, updateURL],
  );

  const handleProjectFilter = useCallback(
    (project: string) => {
      setFilterProject(project);
      setPage(APARTMENT_LISTING_CONFIG.DEFAULT_PAGE);
      updateURL(searchQuery, project, APARTMENT_LISTING_CONFIG.DEFAULT_PAGE);
    },
    [searchQuery, updateURL],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      updateURL(searchQuery, filterProject, newPage);
    },
    [searchQuery, filterProject, updateURL],
  );

  return {
    filters: {
      searchQuery,
      filterProject,
      page,
    } as FilterState,
    handlers: {
      handleSearch,
      handleProjectFilter,
      handlePageChange,
    },
    setters: {
      setSearchQuery,
      setFilterProject,
      setPage,
    },
  };
}
