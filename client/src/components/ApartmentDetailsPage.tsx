"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Apartment } from "../types/apartment";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./imageFallback/ImageWithFallback";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Building2,
  Hash,
  Check,
} from "lucide-react";

interface ApartmentDetailsPageProps {
  apartment: Apartment;
}

export function ApartmentDetailsPage({ apartment }: ApartmentDetailsPageProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);

  const statusColors = {
    available: "bg-green-100 text-green-800",
    rented: "bg-gray-100 text-gray-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="mb-2">{apartment.unitName}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{apartment.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  <span>{apartment.unitNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  <span>{apartment.project}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-blue-600">
                ${apartment.price.toLocaleString()}/month
              </p>
              <Badge className={statusColors[apartment.status]}>
                {apartment.status.charAt(0).toUpperCase() +
                  apartment.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={apartment.images[selectedImage]}
                    alt={`${apartment.unitName} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                  />
                </div>

                {apartment.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {apartment.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-video overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === index
                            ? "border-blue-600"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          width={400}
                          height={300}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {apartment.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {apartment.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="mb-6">Property Details</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bed className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bedrooms</p>
                        <p>
                          {apartment.bedrooms === 0
                            ? "Studio"
                            : apartment.bedrooms}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Bath className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Bathrooms</p>
                        <p>{apartment.bathrooms}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Area</p>
                        <p>{apartment.area} sqft</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Hash className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Unit Number</p>
                        <p>{apartment.unitNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Project</p>
                        <p className="text-sm">{apartment.project}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {apartment.status === "available" && (
                  <Button className="w-full mt-6">Contact Agent</Button>
                )}

                {apartment.status === "pending" && (
                  <Button className="w-full mt-6" variant="outline" disabled>
                    Pending Review
                  </Button>
                )}

                {apartment.status === "rented" && (
                  <Button className="w-full mt-6" variant="outline" disabled>
                    Not Available
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
