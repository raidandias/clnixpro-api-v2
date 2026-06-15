import { Module } from '@nestjs/common';
import { OrderProfessionalService } from './order-professional.service';
import { OrderProfessionalController } from './order-professional.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [OrderProfessionalController],
  providers: [OrderProfessionalService, PrismaService],
  exports: [OrderProfessionalService],
})
export class OrderProfessionalModule {}
