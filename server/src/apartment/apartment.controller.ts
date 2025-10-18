import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { ApartmentService } from '@app/apartment/apartment.service';
import { CreateApartmentDto, PaginationQueryDto } from './dto/apartment.dto';

@Controller('v1/apartment')
export class ApartmentController {
  constructor(private readonly apartService: ApartmentService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: PaginationQueryDto) {
    // validation of this values are handled by the dto
    const { page = 1, perPage = 10, search, project, status } = query;
    const pageNum = page;
    const perPageNum = perPage;

    return this.apartService.findAll(pageNum, perPageNum, {
      search,
      project,
      status,
    });
  }
  @Get('/:unitNumber')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('unitNumber') unitNumber: string) {
    return this.apartService.findOne(unitNumber);
  }

  @Post('add-apartmen')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() apartmentDto: CreateApartmentDto) {
    return this.apartService.createApartment(apartmentDto);
  }
}
