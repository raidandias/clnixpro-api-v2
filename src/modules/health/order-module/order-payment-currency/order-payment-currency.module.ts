import { Module } from '@nestjs/common';
import { OrderPaymentCurrencyService } from './order-payment-currency.service';
import { OrderPaymentCurrencyController } from './order-payment-currency.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [OrderPaymentCurrencyController],
  providers: [OrderPaymentCurrencyService, PrismaService],
  exports: [OrderPaymentCurrencyService],
})
export class OrderPaymentCurrencyModule {}
