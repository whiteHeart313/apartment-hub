import { PrismaClient, Prisma } from '../../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const apartments: Array<{
    unit_name: string;
    unit_number: string;
    project: string;
    address: string;
    price: Prisma.Decimal;
    bedrooms: number;
    description: string;
    status: string;
    amenities: string[];
    images: string[];
    area: Prisma.Decimal;
    bathrooms: number;
  }> = [
    {
      unit_name: 'Garden View A-101',
      unit_number: 'A-101',
      project: 'Sunrise Residency',
      address: '123 Main St, Cityville',
      price: new Prisma.Decimal('120000.00'),
      bedrooms: 2,
      description: 'Cozy 2BR with garden view and modern amenities.',
      status: 'available',
      amenities: ['Garden View', 'Parking', 'Balcony'],
      images: [
        '/images/apartments/apartment(1-1).webp',
        '/images/apartments/apartment(1-2).webp',
        '/images/apartments/apartment(1-3).webp',
      ],
      area: new Prisma.Decimal('85.50'),
      bathrooms: 2,
    },
    {
      unit_name: 'Corner Suite A-102',
      unit_number: 'A-102',
      project: 'Sunrise Residency',
      address: '125 Main St, Cityville',
      price: new Prisma.Decimal('150000.00'),
      bedrooms: 3,
      description: 'Spacious corner unit with excellent natural light.',
      status: 'available',
      amenities: ['Corner Unit', 'Parking', 'Balcony', 'City View'],
      images: [
        '/images/apartments/apartment(2-1).webp',
        '/images/apartments/apartment(2-2).webp',
      ],
      area: new Prisma.Decimal('120.00'),
      bathrooms: 2,
    },
    {
      unit_name: 'Penthouse B-201',
      unit_number: 'B-201',
      project: 'Skyline Towers',
      address: '500 High St, Metropolis',
      price: new Prisma.Decimal('300000.00'),
      bedrooms: 4,
      description: 'Penthouse with panoramic city views and luxury finishes.',
      status: 'available',
      amenities: [
        'Penthouse',
        'Panoramic View',
        'Private Elevator',
        'Terrace',
        'Parking',
      ],
      images: [
        '/images/apartments/apartment(3-1).webp',
        '/images/apartments/apartment(3-2).webp',
      ],
      area: new Prisma.Decimal('200.75'),
      bathrooms: 3,
    },
    {
      unit_name: 'Modern Studio C-301',
      unit_number: 'C-301',
      project: 'Urban Heights',
      address: '789 Downtown Ave, Metro City',
      price: new Prisma.Decimal('95000.00'),
      bedrooms: 1,
      description:
        'Contemporary studio apartment perfect for young professionals.',
      status: 'available',
      amenities: ['Modern Design', 'Gym Access', 'Rooftop Terrace'],
      images: [
        '/images/apartments/apartment(4-1).webp',
        '/images/apartments/apartment(4-2).webp',
      ],
      area: new Prisma.Decimal('65.00'),
      bathrooms: 1,
    },
    {
      unit_name: 'Family Suite D-102',
      unit_number: 'D-102',
      project: 'Green Valley',
      address: '456 Park Lane, Suburbia',
      price: new Prisma.Decimal('180000.00'),
      bedrooms: 3,
      description:
        'Family-friendly apartment with park views and playground access.',
      status: 'rented',
      amenities: ['Park View', 'Playground', 'Family Area', 'Storage'],
      images: [
        '/images/apartments/apartment(5-1).webp',
        '/images/apartments/apartment(5-2).webp',
        '/images/apartments/apartment(5-3).webp',
      ],
      area: new Prisma.Decimal('140.25'),
      bathrooms: 2,
    },
    {
      unit_name: 'Executive Loft E-401',
      unit_number: 'E-401',
      project: 'Business District',
      address: '321 Corporate Blvd, Financial Center',
      price: new Prisma.Decimal('250000.00'),
      bedrooms: 2,
      description: 'Executive loft with high ceilings and premium location.',
      status: 'pending',
      amenities: ['High Ceilings', 'Business Center', 'Concierge', 'Valet'],
      images: ['/images/apartments/apartment(6-1).webp'],
      area: new Prisma.Decimal('110.00'),
      bathrooms: 2,
    },
    {
      unit_name: 'Luxury Penthouse F-501',
      unit_number: 'F-501',
      project: 'Elite Towers',
      address: '999 Luxury Lane, Uptown',
      price: new Prisma.Decimal('450000.00'),
      bedrooms: 4,
      description:
        'Ultra-luxury penthouse with private pool and 360-degree views.',
      status: 'available',
      amenities: [
        'Private Pool',
        '360 Views',
        'Wine Cellar',
        'Smart Home',
        'Private Garage',
      ],
      images: [
        '/images/apartments/apartment(7-1).webp',
        '/images/apartments/apartment(7-2).webp',
        '/images/apartments/apartment(7-3).webp',
      ],
      area: new Prisma.Decimal('280.50'),
      bathrooms: 4,
    },
  ];

  for (const apt of apartments) {
    await prisma.apartment.upsert({
      where: { unit_number: apt.unit_number },
      update: {
        unit_name: apt.unit_name,
        project: apt.project,
        address: apt.address,
        price: apt.price,
        bedrooms: apt.bedrooms,
        description: apt.description,
        status: apt.status,
        amenities: apt.amenities,
        images: apt.images,
        area: apt.area,
        bathrooms: apt.bathrooms,
      },
      create: {
        unit_name: apt.unit_name,
        unit_number: apt.unit_number,
        project: apt.project,
        address: apt.address,
        price: apt.price,
        bedrooms: apt.bedrooms,
        description: apt.description,
        status: apt.status,
        amenities: apt.amenities,
        images: apt.images,
        area: apt.area,
        bathrooms: apt.bathrooms,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
