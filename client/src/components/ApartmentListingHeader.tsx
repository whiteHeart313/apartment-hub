"use client";

import { Building2, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { APARTMENT_LISTING_MESSAGES } from "../constants/apartmentListing";

interface ApartmentListingHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ApartmentListingHeader({
  title = APARTMENT_LISTING_MESSAGES.HEADER_TITLE,
  subtitle = APARTMENT_LISTING_MESSAGES.HEADER_SUBTITLE,
}: ApartmentListingHeaderProps) {
  const pathname = usePathname();
  const isAddApartmentPage = pathname === "/apartments/add";

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-2">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </Link>
          {!isAddApartmentPage && (
            <Button asChild>
              <Link href="/apartments/add">
                <Plus className="w-4 h-4 mr-2" />
                Add Apartment
              </Link>
            </Button>
          )}
        </div>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
