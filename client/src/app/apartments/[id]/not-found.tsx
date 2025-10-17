import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Building2, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Apartment Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the apartment you&apos;re looking for.
            It may have been removed or the link might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Link>
          </Button>

          <p className="text-sm text-gray-500">
            Need help?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
