import type { Metadata } from "next";
import { ApartmentListingHeader } from "../components/ApartmentListingHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Responsive Apartment Listing App",
  description: "A modern apartment listing application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApartmentListingHeader />
        {children}
      </body>
    </html>
  );
}
