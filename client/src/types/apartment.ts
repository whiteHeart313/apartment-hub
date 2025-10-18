export interface Apartment {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  description: string;
  amenities: string[];
  address: string;
  status: "available" | "rented" | "pending";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  total?: number;
}

// Backend apartment interface (matches the database schema)
export interface BackendApartment {
  id: number;
  unit_name: string;
  unit_number: string;
  project: {
    id: number;
    name: string;
    description: string | null;
    location: string | null;
    createdAt: string;
    updatedAt: string;
  };
  address: string;
  price: string; // Decimal comes as string from backend
  bedrooms: number;
  description: string;
  status: string;
  amenities: string[];
  images: string[];
  area: string; // Decimal comes as string from backend
  bathrooms: number;
  createdAt: string;
}

export interface ApartmentFilters {
  page?: number;
  perPage?: number;
  search?: string;
  project?: string;
  status?: string;
}
