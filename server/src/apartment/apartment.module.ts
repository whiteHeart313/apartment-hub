import { Module } from '@nestjs/common';
import { ApartmentService } from '@app/apartment/apartment.service';
import { ApartmentController } from '@app/apartment/apartment.controller';
import { PrismaModule } from '@app/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService], // Export if other modules need it
})
export class ApartmentModule {}
