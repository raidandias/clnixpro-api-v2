import { Module } from '@nestjs/common';
import { OrderProfessionalScheduleService } from './order-professional-schedule.service';
import { OrderProfessionalScheduleController } from './order-professional-schedule.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [OrderProfessionalScheduleController],
  providers: [OrderProfessionalScheduleService, PrismaService],
  exports: [OrderProfessionalScheduleService],
})
export class OrderProfessionalScheduleModule {}
