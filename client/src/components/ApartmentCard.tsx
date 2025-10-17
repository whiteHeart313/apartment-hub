import { Apartment } from "../types/apartment";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./imageFallback/ImageWithFallback";
import { MapPin, Bed, Bath, Maximize2 } from "lucide-react";

interface ApartmentCardProps {
  apartment: Apartment;
  onClick: () => void;
}

export function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800",
    rented: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={apartment.images[0]}
          alt={apartment.unitName}
          className="w-full h-full object-cover"
        />
        <Badge
          className={`absolute top-3 right-3 ${statusColors[apartment.status]}`}
        >
          {apartment.status.charAt(0).toUpperCase() + apartment.status.slice(1)}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="mb-1">{apartment.unitName}</h3>
            <p className="text-sm text-gray-600">
              {apartment.unitNumber} • {apartment.project}
            </p>
          </div>
          <p className="text-blue-600">
            ${apartment.price.toLocaleString()}/mo
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{apartment.address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>
              {apartment.bedrooms} {apartment.bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>
              {apartment.bathrooms}{" "}
              {apartment.bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            <span>{apartment.area} sqft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
