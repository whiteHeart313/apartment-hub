import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Param,
} from '@nestjs/common';
import { ApartmentService } from '@app/apartment/apartment.service';
import { PaginationQueryDto } from './dto/partment.dto';

@Controller('v1/apartment')
export class ApartmentController {
  constructor(private readonly apartService: ApartmentService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() pagination: PaginationQueryDto) {
    // validation of this values are handled by the dto
    const { page = 1, perPage = 10 } = pagination;
    const pageNum = page;
    const perPageNum = perPage;

    return this.apartService.findAll(pageNum, perPageNum);
  }
  @Get('/:unitNumber')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('unitNumber') unitNumber: string) {
    return this.apartService.findOne(unitNumber);
  }
}
