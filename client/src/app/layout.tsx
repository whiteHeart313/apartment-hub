import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
