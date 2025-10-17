import { notFound } from "next/navigation";
import { ApartmentDetailsPage } from "../../../components/ApartmentDetailsPage";
import { apartments } from "../../../data/apartments";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ApartmentDetails({ params }: Props) {
  const { id } = await params;
  const apartment = apartments.find((apt) => apt.id === id);

  if (!apartment) {
    notFound();
  }

  return <ApartmentDetailsPage apartment={apartment} />;
}

export async function generateStaticParams() {
  return apartments.map((apartment) => ({
    id: apartment.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const apartment = apartments.find((apt) => apt.id === id);

  if (!apartment) {
    return {
      title: "Apartment Not Found",
    };
  }

  return {
    title: `${apartment.unitName} - ${apartment.project}`,
    description: apartment.description,
  };
}
