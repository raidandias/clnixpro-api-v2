import { Module } from '@nestjs/common';
import { InvoicePayableService } from './invoice-payable.service';
import { InvoicePayableController } from './invoice-payable.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [InvoicePayableController],
  providers: [InvoicePayableService, PrismaService],
  exports: [InvoicePayableService],
})
export class InvoicePayableModule {}
