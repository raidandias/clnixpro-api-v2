import { Module } from '@nestjs/common';
import { InvoiceReceivableService } from './invoice-receivable.service';
import { InvoiceReceivableController } from './invoice-receivable.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [InvoiceReceivableController],
  providers: [InvoiceReceivableService, PrismaService],
  exports: [InvoiceReceivableService],
})
export class InvoiceReceivableModule {}
