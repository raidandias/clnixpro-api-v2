import { Module } from '@nestjs/common';
import { HealthMedicalCareService } from './health-medical-care.service';
import { HealthMedicalCareController } from './health-medical-care.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [HealthMedicalCareController],
  providers: [HealthMedicalCareService, PrismaService],
  exports: [HealthMedicalCareService],
})
export class HealthMedicalCareModule {}
