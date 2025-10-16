// apartment/apartment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const data = await this.prisma.apartment.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    });

    return { data, page, perPage };
  }

  async findOne(unitNumber: string) {
    return this.prisma.apartment.findUnique({
      where: { unit_number: unitNumber },
    });
  }

  async search(query: string) {
    return this.prisma.apartment.findMany({
      where: {
        OR: [
          { unit_name: { contains: query, mode: 'insensitive' } },
          { unit_number: { contains: query, mode: 'insensitive' } },
          { project: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}
