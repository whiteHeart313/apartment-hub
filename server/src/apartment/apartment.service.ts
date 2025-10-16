// apartment/apartment.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreateApartmentDto } from './dto/apartment.dto';
import { Prisma } from 'generated/prisma';
import { logger } from '@app/utils/logger';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;
    const take = perPage;
    const data = await this.prisma.apartment.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return { data, page, perPage };
  }

  async findOne(unitNumber: string) {
    const apartment = await this.prisma.apartment.findUnique({
      where: { unit_number: unitNumber },
    });

    if (!apartment) {
      throw new NotFoundException(
        `Apartment with unit_number ${unitNumber} not found`,
      );
    }

    return apartment;
  }

  async createApartment(apartmentDto: CreateApartmentDto) {
    await this.checkForDuplicateUnitNumber(apartmentDto.unit_number);
    const payload = {
      ...apartmentDto,
      price: new Prisma.Decimal(apartmentDto.price),
    };

    try {
      return await this.prisma.apartment.create({ data: payload });
    } catch (err) {
      logger.error('Failed to create apartment', err);
      throw err;
    }
  }
  // we can use search_vector tsvector, -- For full-text search in postgres
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

  async checkForDuplicateUnitNumber(unitNumber: string) {
    const apartment = await this.prisma.apartment.findUnique({
      where: { unit_number: unitNumber },
    });

    if (apartment) {
      throw new ConflictException(
        `Apartment with unit_number ${unitNumber} already exists`,
      );
    }
  }
}
