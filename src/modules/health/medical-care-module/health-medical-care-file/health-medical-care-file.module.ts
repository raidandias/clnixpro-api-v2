import { Module } from '@nestjs/common';
import { HealthMedicalCareFileService } from './health-medical-care-file.service';
import { HealthMedicalCareFileController } from './health-medical-care-file.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [HealthMedicalCareFileController],
  providers: [HealthMedicalCareFileService, PrismaService],
  exports: [HealthMedicalCareFileService],
})
export class HealthMedicalCareFileModule {}
