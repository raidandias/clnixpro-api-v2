import { Module } from '@nestjs/common';
import { BenefitItemService } from './benefit-item.service';
import { BenefitItemController } from './benefit-item.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [BenefitItemController],
  providers: [BenefitItemService, PrismaService],
  exports: [BenefitItemService],
})
export class BenefitItemModule {}
