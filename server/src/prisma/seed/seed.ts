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
      description: 'Cozy 2BR with garden view.',
      status: 'available',
      amenities: ['Garden View', 'Parking', 'Balcony'],
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
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
      description: 'Spacious corner unit.',
      status: 'available',
      amenities: ['Corner Unit', 'Parking', 'Balcony', 'City View'],
      images: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
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
      description: 'Penthouse with panoramic city views.',
      status: 'available',
      amenities: [
        'Penthouse',
        'Panoramic View',
        'Private Elevator',
        'Terrace',
        'Parking',
      ],
      images: [
        'https://example.com/image5.jpg',
        'https://example.com/image6.jpg',
        'https://example.com/image7.jpg',
      ],
      area: new Prisma.Decimal('200.75'),
      bathrooms: 3,
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
