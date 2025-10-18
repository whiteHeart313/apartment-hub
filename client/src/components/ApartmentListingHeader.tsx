import { Building2 } from "lucide-react";
import { APARTMENT_LISTING_MESSAGES } from "../constants/apartmentListing";

interface ApartmentListingHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ApartmentListingHeader({
  title = APARTMENT_LISTING_MESSAGES.HEADER_TITLE,
  subtitle = APARTMENT_LISTING_MESSAGES.HEADER_SUBTITLE,
}: ApartmentListingHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
