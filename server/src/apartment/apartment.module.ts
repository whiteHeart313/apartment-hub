import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService], // Export if other modules need it
})
export class ApartmentModule {}
