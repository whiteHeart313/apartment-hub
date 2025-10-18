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
        include: {
          project: true, // Include project details
        },
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

  async findOne(id: number) {
    const apartment = await this.prisma.apartment.findUnique({
      where: { id: id },
      include: {
        project: true, // Include project details
      },
    });

    if (!apartment) {
      throw new NotFoundException(`Apartment with unit_number ${id} not found`);
    }

    return apartment;
  }

  async createApartment(apartmentDto: CreateApartmentDto) {
    await this.checkForDuplicateUnitNumber(apartmentDto.unit_number);

    // Find or create project
    const project = await this.findProject(apartmentDto.project);

    if (!project) {
      throw new NotFoundException(
        `Project with name ${apartmentDto.project} not found`,
      );
    }

    const payload = {
      unit_name: apartmentDto.unit_name,
      unit_number: apartmentDto.unit_number,
      projectId: project.id,
      address: apartmentDto.address,
      price: new Prisma.Decimal(apartmentDto.price),
      bedrooms: apartmentDto.bedrooms,
      description: apartmentDto.description,
      status: apartmentDto.status,
      amenities: apartmentDto.amenities,
      images: apartmentDto.images,
      area: new Prisma.Decimal(apartmentDto.area),
      bathrooms: apartmentDto.bathrooms,
    };

    try {
      return await this.prisma.apartment.create({
        data: payload,
        include: {
          project: true, // Include project details in response
        },
      });
    } catch (err) {
      logger.error('Failed to create apartment', err);
      throw err;
    }
  }

  async findProject(projectName: string) {
    const project = await this.prisma.project.findUnique({
      where: { name: projectName },
    });

    return project;
  }

  // if projects grow we may add pagination , but for simplicity now we return everything
  // if there are more functionality about the projects (UPDATE / DELETE ) we may create a seperate service

  async gettAllProjects() {
    return this.prisma.project.findMany();
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
      { address: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { project: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  const status = filters.status?.trim();

  if (isNonEmptyString(status)) {
    where.status = status;
  }

  const project = filters.project?.trim();

  if (isNonEmptyString(project)) {
    where.project = {
      name: { contains: project, mode: 'insensitive' },
    };
  }

  return where;
}
