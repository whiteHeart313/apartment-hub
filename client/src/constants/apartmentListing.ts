export const APARTMENT_LISTING_CONFIG = {
  ITEMS_PER_PAGE: 10,
  DEFAULT_FILTER_PROJECT: "all",
  DEFAULT_PAGE: 1,
  GRID_BREAKPOINTS: {
    MOBILE: "grid-cols-1",
    TABLET: "md:grid-cols-2",
    DESKTOP: "lg:grid-cols-3",
  },
  DEBOUNCE_DELAY: 500,
} as const;

export const APARTMENT_LISTING_MESSAGES = {
  LOADING: "Loading apartments...",
  NO_RESULTS: "No apartments match your search criteria",
  LOAD_MORE: "Load More",
  LOADING_MORE: "Loading...",
  HEADER_TITLE: "Apartment Listings",
  HEADER_SUBTITLE: "Find your perfect home",
} as const;
