import { Module } from '@nestjs/common';
import { InvoicePaymentService } from './invoice-payment.service';
import { InvoicePaymentController } from './invoice-payment.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [InvoicePaymentController],
  providers: [InvoicePaymentService, PrismaService],
  exports: [InvoicePaymentService],
})
export class InvoicePaymentModule {}
