"use client";

import { useState, useEffect, useCallback } from "react";
import { apartmentService } from "../services/apartmentService";
import { Apartment, ApartmentFilters } from "../types/apartment";

interface UseApartmentsState {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    perPage: number;
    total?: number;
  };
}

interface UseApartmentsReturn extends UseApartmentsState {
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

export function useApartments(
  filters: ApartmentFilters = {},
): UseApartmentsReturn {
  const [state, setState] = useState<UseApartmentsState>({
    apartments: [],
    loading: true,
    error: null,
    pagination: {
      page: filters.page || 1,
      perPage: filters.perPage || 10,
    },
  });

  const fetchApartments = useCallback(
    async (isLoadMore = false) => {
      try {
        setState((prev) => ({
          ...prev,
          loading: !isLoadMore, // Don't show loading for load more
          error: null,
        }));

        const currentPage = isLoadMore
          ? state.pagination.page + 1
          : filters.page || 1;
        const response = await apartmentService.getApartments({
          ...filters,
          page: currentPage,
        });

        setState((prev) => ({
          apartments: isLoadMore
            ? [...prev.apartments, ...response.apartments]
            : response.apartments,
          loading: false,
          error: null,
          pagination: {
            ...response.pagination,
            page: currentPage,
          },
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch apartments",
        }));
      }
    },
    [filters, state.pagination.page],
  );

  const refetch = useCallback(() => fetchApartments(false), [fetchApartments]);

  const loadMore = useCallback(() => fetchApartments(true), [fetchApartments]);

  const hasMore = state.pagination.total
    ? state.apartments.length < state.pagination.total
    : true; // Assume there might be more if total is unknown

  useEffect(() => {
    fetchApartments(false);
  }, [
    fetchApartments,
    filters.page,
    filters.perPage,
    filters.search,
    filters.project,
    filters.status,
  ]);

  return {
    ...state,
    refetch,
    loadMore,
    hasMore,
  };
}

interface UseApartmentState {
  apartment: Apartment | null;
  loading: boolean;
  error: string | null;
}

interface UseApartmentReturn extends UseApartmentState {
  refetch: () => Promise<void>;
}

export function useApartment(unitNumber: string | null): UseApartmentReturn {
  const [state, setState] = useState<UseApartmentState>({
    apartment: null,
    loading: !!unitNumber,
    error: null,
  });

  const fetchApartment = useCallback(async () => {
    if (!unitNumber) {
      setState({
        apartment: null,
        loading: false,
        error: null,
      });
      return;
    }

    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const apartment =
        await apartmentService.getApartmentByUnitNumber(unitNumber);

      setState({
        apartment,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        apartment: null,
        loading: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch apartment",
      });
    }
  }, [unitNumber]);

  const refetch = useCallback(() => fetchApartment(), [fetchApartment]);

  useEffect(() => {
    fetchApartment();
  }, [fetchApartment]);

  return {
    ...state,
    refetch,
  };
}

interface UseApartmentSearchState {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}

interface UseApartmentSearchReturn extends UseApartmentSearchState {
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useApartmentSearch(): UseApartmentSearchReturn {
  const [state, setState] = useState<UseApartmentSearchState>({
    apartments: [],
    loading: false,
    error: null,
  });

  const search = useCallback(async (query: string) => {
    try {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      const apartments = await apartmentService.searchApartments(query);

      setState({
        apartments,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        apartments: [],
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to search apartments",
      });
    }
  }, []);

  const clear = useCallback(() => {
    setState({
      apartments: [],
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    search,
    clear,
  };
}
