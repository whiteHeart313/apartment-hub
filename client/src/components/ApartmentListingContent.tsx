import { ApartmentCard } from "./ApartmentCard";
import { LoadingGrid, LoadingSpinner } from "./ui/loading";
import { ErrorCard } from "./ui/error";
import { Button } from "./ui/button";
import { Apartment } from "../types/apartment";
import { PaginationState } from "../types/apartmentListing";
import {
  APARTMENT_LISTING_CONFIG,
  APARTMENT_LISTING_MESSAGES,
} from "../constants/apartmentListing";

interface ApartmentListingContentProps {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  perPage: number;
  page: number;
  pagination: PaginationState;
  onApartmentClick: (apartmentId: string) => void;
  onLoadMore: () => void;
  onRetry: () => void;
}

export function ApartmentListingContent({
  apartments,
  loading,
  error,
  hasMore,
  perPage,
  page,
  pagination,
  onApartmentClick,
  onLoadMore,
  onRetry,
}: ApartmentListingContentProps) {
  if (error) {
    return <ErrorCard message={error} onRetry={onRetry} className="mb-6" />;
  }

  const gridClasses = `grid ${APARTMENT_LISTING_CONFIG.GRID_BREAKPOINTS.MOBILE} ${APARTMENT_LISTING_CONFIG.GRID_BREAKPOINTS.TABLET} ${APARTMENT_LISTING_CONFIG.GRID_BREAKPOINTS.DESKTOP} gap-6`;

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        {loading && page === APARTMENT_LISTING_CONFIG.DEFAULT_PAGE ? (
          APARTMENT_LISTING_MESSAGES.LOADING
        ) : (
          <>
            {apartments.length}{" "}
            {apartments.length === 1 ? "apartment" : "apartments"} found
            {pagination.total && ` of ${pagination.total} total`}
          </>
        )}
      </div>

      {loading && page === APARTMENT_LISTING_CONFIG.DEFAULT_PAGE ? (
        <LoadingGrid count={perPage} />
      ) : apartments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {APARTMENT_LISTING_MESSAGES.NO_RESULTS}
          </p>
        </div>
      ) : (
        <>
          <div className={gridClasses}>
            {apartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                onClick={() => onApartmentClick(apartment.id)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <Button
                onClick={onLoadMore}
                disabled={loading}
                variant="outline"
                className="min-w-32"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    {APARTMENT_LISTING_MESSAGES.LOADING_MORE}
                  </>
                ) : (
                  APARTMENT_LISTING_MESSAGES.LOAD_MORE
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
