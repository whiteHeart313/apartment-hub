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

function buildWhereClause(filters: {
  search?: string;
  project?: string;
  status?: string;
}): Prisma.ApartmentWhereInput {
  const where: Prisma.ApartmentWhereInput = {};
  const search = filters?.search?.trim() ?? '';
  // in the above line we know that if search is null, the coalescing operator is going to apply the right hand side
  // but only for avioding [Unexpected nullable string value in conditional] lint flag , we check if search is null again in the if condition.

  if (search.length > 1 && search !== '') {
    where.OR = [
      { unit_name: { contains: search, mode: 'insensitive' } },
      { unit_number: { contains: search, mode: 'insensitive' } },
      { project: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  const status = filters?.status?.trim() ?? '';

  if (status.length > 1 && status !== '') {
    where.status = status;
  }

  const project = filters?.project?.trim() ?? '';

  if (project.length > 1 && project !== '') {
    where.project = { contains: project, mode: 'insensitive' };
  }

  return where;
}
