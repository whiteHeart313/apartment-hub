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
  }> = [
    {
      unit_name: 'Garden View A-101',
      unit_number: 'A-101',
      project: 'Sunrise Residency',
      address: '123 Main St, Cityville',
      price: new Prisma.Decimal('120000.00'),
      bedrooms: 2,
      description: 'Cozy 2BR with garden view.',
    },
    {
      unit_name: 'Corner Suite A-102',
      unit_number: 'A-102',
      project: 'Sunrise Residency',
      address: '125 Main St, Cityville',
      price: new Prisma.Decimal('150000.00'),
      bedrooms: 3,
      description: 'Spacious corner unit.',
    },
    {
      unit_name: 'Penthouse B-201',
      unit_number: 'B-201',
      project: 'Skyline Towers',
      address: '500 High St, Metropolis',
      price: new Prisma.Decimal('300000.00'),
      bedrooms: 4,
      description: 'Penthouse with panoramic city views.',
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
      },
      create: {
        unit_name: apt.unit_name,
        unit_number: apt.unit_number,
        project: apt.project,
        address: apt.address,
        price: apt.price,
        bedrooms: apt.bedrooms,
        description: apt.description,
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
