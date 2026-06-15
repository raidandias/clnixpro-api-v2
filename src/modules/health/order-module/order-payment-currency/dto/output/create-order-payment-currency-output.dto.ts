import { ApiProperty } from '@nestjs/swagger';
import { TypeCurrencyExchange, FormOfPaymentCurrency } from '@prisma/client';

export class CreateOrderPaymentCurrencyOutputDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order payment currency.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order payment currency.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the payment currency.',
  })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order payment associated with this currency entry.',
  })
  orderPaymentId: string;

  @ApiProperty({
    example: TypeCurrencyExchange.BRL,
    description: 'The type of currency exchange.',
    enum: TypeCurrencyExchange,
  })
  typeCurrencyExchange: TypeCurrencyExchange;

  @ApiProperty({
    example: 100.00,
    description: 'The value received in the currency.',
  })
  valueReceived: number;

  @ApiProperty({
    example: 100.00,
    description: 'The value in the base currency.',
  })
  value: number;

  @ApiProperty({
    example: FormOfPaymentCurrency.PIX,
    description: 'The form of payment currency.',
    enum: FormOfPaymentCurrency,
  })
  formOfPaymentCurrency: FormOfPaymentCurrency;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the payment was made.',
  })
  paymentAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the record was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
