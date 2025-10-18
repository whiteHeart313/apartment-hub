import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApartments } from "./useApartments";
import { useUrlFilters } from "./useUrlFilters";
import { apartmentService } from "../services/apartmentService";
import { APARTMENT_LISTING_CONFIG } from "../constants/apartmentListing";

interface Project {
  id: number;
  name: string;
}

export function useApartmentFilters() {
  const router = useRouter();
  const { filters, handlers, setters } = useUrlFilters();
  const { searchQuery, filterProject, page } = filters;
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const perPage = APARTMENT_LISTING_CONFIG.ITEMS_PER_PAGE;

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const projectsData = await apartmentService.getAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

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
