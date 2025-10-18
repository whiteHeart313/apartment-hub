import { apiClient, ApiError } from "./api";
import {
  Apartment,
  ApartmentFilters,
  BackendApartment,
  PaginatedResponse,
} from "../types/apartment";

function transformApartment(backendApartment: BackendApartment): Apartment {
  return {
    id: backendApartment.id.toString(),
    unitName: backendApartment.unit_name,
    unitNumber: backendApartment.unit_number,
    project: backendApartment.project.name,
    price: parseFloat(backendApartment.price),
    bedrooms: backendApartment.bedrooms,
    bathrooms: backendApartment.bathrooms,
    area: parseFloat(backendApartment.area),
    images: backendApartment.images,
    description: backendApartment.description,
    amenities: backendApartment.amenities,
    address: backendApartment.address,
    status: backendApartment.status as "available" | "rented" | "pending",
  };
}

export class ApartmentService {
  private static instance: ApartmentService;

  static getInstance(): ApartmentService {
    if (!ApartmentService.instance) {
      ApartmentService.instance = new ApartmentService();
    }
    return ApartmentService.instance;
  }

  /**
   * Get all apartments with pagination and optional filters
   */
  async getApartments(filters: ApartmentFilters = {}): Promise<{
    apartments: Apartment[];
    pagination: {
      page: number;
      perPage: number;
      total?: number;
    };
  }> {
    try {
      const { page = 1, perPage = 10, search, project, status } = filters;

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });

      if (search) params.append("search", search);
      if (project) params.append("project", project);
      if (status) params.append("status", status);

      const response = await apiClient.get<PaginatedResponse<BackendApartment>>(
        `/v1/apartments?${params.toString()}`,
      );

      const apartments = response.data.map(transformApartment);

      return {
        apartments,
        pagination: {
          page: response.page,
          perPage: response.perPage,
          total: response.total,
        },
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch apartments: ${error.message}`);
      }
      throw new Error("Failed to fetch apartments: Unknown error occurred");
    }
  }

  /**
   * Get a specific apartment by unit number
   */
  async getApartmentByUnitNumber(unitNumber: string): Promise<Apartment> {
    try {
      const response = await apiClient.get<BackendApartment>(
        `/v1/apartments/${encodeURIComponent(unitNumber)}`,
      );

      return transformApartment(response);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 404) {
          throw new Error(
            `Apartment with unit number "${unitNumber}" not found`,
          );
        }
        throw new Error(`Failed to fetch apartment: ${error.message}`);
      }
      throw new Error("Failed to fetch apartment: Unknown error occurred");
    }
  }

  /**
   * Search apartments by query
   */
  async searchApartments(query: string): Promise<Apartment[]> {
    try {
      if (!query.trim()) {
        return [];
      }

      const response = await apiClient.get<BackendApartment[]>(
        `/v1/apartments/search?q=${encodeURIComponent(query.trim())}`,
      );

      return response.map(transformApartment);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to search apartments: ${error.message}`);
      }
      throw new Error("Failed to search apartments: Unknown error occurred");
    }
  }

  /**
   * Get all projects
   */
  async getAllProjects(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await apiClient.get<{ id: number; name: string }[]>(
        "/v1/apartments/projects",
      );
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }
      throw new Error("Failed to fetch projects: Unknown error occurred");
    }
  }

  /**
   * Create a new apartment (for admin use)
   */
  async createApartment(
    apartmentData: Omit<Apartment, "id">,
  ): Promise<Apartment> {
    try {
      // Transform frontend data to backend format
      const backendData = {
        unit_name: apartmentData.unitName,
        unit_number: apartmentData.unitNumber,
        project: apartmentData.project,
        address: apartmentData.address,
        price: apartmentData.price.toString(),
        bedrooms: apartmentData.bedrooms,
        description: apartmentData.description,
        status: apartmentData.status,
        amenities: apartmentData.amenities,
        images: apartmentData.images,
        area: apartmentData.area.toString(),
        bathrooms: apartmentData.bathrooms,
      };

      const response = await apiClient.post<BackendApartment>(
        "/v1/apartments/add-apartmen", // Note: keeping the typo from backend
        backendData,
      );

      return transformApartment(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to create apartment: ${error.message}`);
      }
      throw new Error("Failed to create apartment: Unknown error occurred");
    }
  }

  /**
   * Upload images for apartment
   */
  async uploadImages(images: File[]): Promise<string[]> {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(
        "http://localhost:8080/v1/apartments/upload-images",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const result = await response.json();
      return result.images;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(`Failed to upload images: ${error.message}`);
      }
      throw new Error("Failed to upload images: Unknown error occurred");
    }
  }
}

// Export singleton instance
export const apartmentService = ApartmentService.getInstance();
