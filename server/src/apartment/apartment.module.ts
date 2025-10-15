import { Module } from '@nestjs/common';
import { ApartmentService } from '@app/apartment/apartment.service';
import { ApartmentController } from '@app/apartment/apartment.controller';

@Module({
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService], // Export if other modules need it
})
export class ApartmentModule {}
