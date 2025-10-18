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
import { ApartmentFilters } from './interfaces/apartment.interface';
import { isNonEmptyString } from '@app/utils/helpers';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page = 1,
    perPage = 10,
    filters: { search?: string; project?: string; status?: string } = {},
  ) {
    const skip = (page - 1) * perPage;
    const take = perPage;

    const where: Prisma.ApartmentWhereInput = buildWhereClause(filters);

    const [data, total] = await Promise.all([
      this.prisma.apartment.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.apartment.count({ where }),
    ]);

    return {
      data,
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    };
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
      area: new Prisma.Decimal(apartmentDto.area),
    };

    try {
      return await this.prisma.apartment.create({ data: payload });
    } catch (err) {
      logger.error('Failed to create apartment', err);
      throw err;
    }
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

/**
 * Builds a Prisma where clause from apartment filters
 * @param filters - Filter object with optional search, project, and status
 * @returns Prisma.ApartmentWhereInput for database queries
 */
function buildWhereClause(
  filters?: ApartmentFilters,
): Prisma.ApartmentWhereInput {
  const where: Prisma.ApartmentWhereInput = {};

  if (!filters) {
    return where;
  }

  const search = filters.search?.trim();

  if (isNonEmptyString(search)) {
    where.OR = [
      { unit_name: { contains: search, mode: 'insensitive' } },
      { unit_number: { contains: search, mode: 'insensitive' } },
      { project: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const status = filters.status?.trim();

  if (isNonEmptyString(status)) {
    where.status = status;
  }

  const project = filters.project?.trim();

  if (isNonEmptyString(project)) {
    where.project = { contains: project, mode: 'insensitive' };
  }

  return where;
}
