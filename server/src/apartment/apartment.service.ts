// apartment/apartment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
//import { CreateApartmentDto } from './dto/create-apartment.dto';
@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.apartment.findMany();
  }

  async findOne(id: number) {
    return this.prisma.apartment.findUnique({
      where: { id },
    });
  }

  /**
   * 
   * @param query 
   * @returns 
   * async create(data: CreateApartmentDto) {
    return this.prisma.apartment.create({
      data,
    });
    
  }
   */

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
