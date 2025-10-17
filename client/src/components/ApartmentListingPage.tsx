"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apartments } from "../data/apartments";
import { ApartmentCard } from "./ApartmentCard";
import { SearchBar } from "./SearchBar";
import { Building2 } from "lucide-react";

export function ApartmentListingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState("all");

  const projects = useMemo(() => {
    const uniqueProjects = new Set(apartments.map((apt) => apt.project));
    return Array.from(uniqueProjects);
  }, []);

  const filteredApartments = useMemo(() => {
    return apartments.filter((apartment) => {
      const matchesSearch =
        apartment.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apartment.unitNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        apartment.project.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProject =
        filterProject === "all" || apartment.project === filterProject;

      return matchesSearch && matchesProject;
    });
  }, [searchQuery, filterProject]);

  const handleApartmentClick = (apartmentId: string) => {
    router.push(`/apartments/${apartmentId}`);
  };

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
          setSearchQuery={setSearchQuery}
          filterProject={filterProject}
          setFilterProject={setFilterProject}
          projects={projects}
        />

        <div className="mb-4 text-sm text-gray-600">
          {filteredApartments.length}{" "}
          {filteredApartments.length === 1 ? "apartment" : "apartments"} found
        </div>

        {filteredApartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No apartments match your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                onClick={() => handleApartmentClick(apartment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
