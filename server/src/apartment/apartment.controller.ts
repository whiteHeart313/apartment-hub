import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApartmentService } from '@app/apartment/apartment.service';

@Controller('v1/apartment')
export class ApartmentController {
  constructor(private readonly apartService: ApartmentService) {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.apartService.findAll();
  }
  @Get('/:unitNumber')
  @HttpCode(HttpStatus.OK)
  async findOne(unitNumber: number) {
    return this.apartService.findOne(unitNumber);
  }
}
