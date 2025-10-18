import { Apartment } from "./apartment";

export interface FilterState {
  searchQuery: string;
  filterProject: string;
  page: number;
}

export interface PaginationState {
  total?: number;
  page: number;
  perPage: number;
  totalPages?: number;
}

export interface ApartmentListingData {
  apartments: Apartment[];
  projects: string[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  hasMore: boolean;
  perPage: number;
}

export interface ApartmentListingHandlers {
  handleSearch: (query: string) => void;
  handleProjectFilter: (project: string) => void;
  handleApartmentClick: (apartmentId: string) => void;
  handleLoadMore: () => Promise<void>;
  refetch: () => void;
}

export interface ApartmentListingState extends ApartmentListingData {
  filters: FilterState;
}

export interface ApartmentListingProps
  extends ApartmentListingState,
    ApartmentListingHandlers {}

export interface GridBreakpoints {
  MOBILE: string;
  TABLET: string;
  DESKTOP: string;
}

export interface ApartmentListingConfig {
  ITEMS_PER_PAGE: number;
  DEFAULT_FILTER_PROJECT: string;
  DEFAULT_PAGE: number;
  GRID_BREAKPOINTS: GridBreakpoints;
  DEBOUNCE_DELAY: number;
}

export interface ApartmentListingMessages {
  LOADING: string;
  NO_RESULTS: string;
  LOAD_MORE: string;
  LOADING_MORE: string;
  HEADER_TITLE: string;
  HEADER_SUBTITLE: string;
}
