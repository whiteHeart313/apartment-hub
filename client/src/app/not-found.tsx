import Link from "next/link";
import { Button } from "../components/ui/button";
import { Building2, Home, ArrowLeft } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center px-4">
        <div className="mb-8">
          <Building2 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Apartment Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
