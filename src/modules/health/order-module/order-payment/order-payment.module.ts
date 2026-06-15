import { Module } from '@nestjs/common';
import { OrderPaymentService } from './order-payment.service';
import { OrderPaymentController } from './order-payment.controller';
import { PrismaService } from 'src/share/service/prisma/prisma.service';

@Module({
  controllers: [OrderPaymentController],
  providers: [OrderPaymentService, PrismaService],
  exports: [OrderPaymentService],
})
export class OrderPaymentModule {}
