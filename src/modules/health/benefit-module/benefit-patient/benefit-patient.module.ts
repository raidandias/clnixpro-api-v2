import { Module } from '@nestjs/common';
import { BenefitPatientService } from './benefit-patient.service';
import { BenefitPatientController } from './benefit-patient.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [BenefitPatientController],
  providers: [BenefitPatientService, PrismaService],
  exports: [BenefitPatientService],
})
export class BenefitPatientModule {}
