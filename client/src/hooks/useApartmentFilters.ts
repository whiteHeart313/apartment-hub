import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApartments } from "./useApartments";
import { useUrlFilters } from "./useUrlFilters";
import { APARTMENT_LISTING_CONFIG } from "../constants/apartmentListing";

export function useApartmentFilters() {
  const router = useRouter();
  const { filters, handlers, setters } = useUrlFilters();
  const { searchQuery, filterProject, page } = filters;

  const perPage = APARTMENT_LISTING_CONFIG.ITEMS_PER_PAGE;

  const { apartments, loading, error, pagination, refetch, loadMore, hasMore } =
    useApartments({
      page,
      perPage,
      search: searchQuery || undefined,
      project:
        filterProject !== APARTMENT_LISTING_CONFIG.DEFAULT_FILTER_PROJECT
          ? filterProject
          : undefined,
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

  const handleLoadMore = useCallback(async () => {
    if (!loading && hasMore) {
      const newPage = page + 1;
      setters.setPage(newPage);
      handlers.handlePageChange(newPage);
      await loadMore();
    }
  }, [loading, hasMore, loadMore, page, handlers, setters]);

  return {
    // Data
    apartments,
    projects,
    loading,
    error,
    pagination,
    hasMore,
    perPage,

    // Filters
    filters,

    // Handlers
    handleSearch: handlers.handleSearch,
    handleProjectFilter: handlers.handleProjectFilter,
    handleApartmentClick,
    handleLoadMore,
    refetch,
  };
}
