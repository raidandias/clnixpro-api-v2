import { ApiProperty } from '@nestjs/swagger';
import { TypeCurrencyExchange, FormOfPaymentCurrency } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateOrderPaymentCurrencyInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order payment currency.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the payment currency.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order payment associated with this currency entry.',
  })
  @IsString({ message: 'Order Payment ID must be a string.' })
  @IsUUID(4, { message: 'Order Payment ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order Payment ID is required.' })
  orderPaymentId: string;

  @ApiProperty({
    example: TypeCurrencyExchange.BRL,
    description: 'The type of currency exchange.',
    enum: TypeCurrencyExchange,
    required: false,
  })
  @IsEnum(TypeCurrencyExchange, { message: 'Type Currency Exchange must be a valid enum value.' })
  @IsOptional()
  typeCurrencyExchange?: TypeCurrencyExchange;

  @ApiProperty({
    example: 100.00,
    description: 'The value received in the currency.',
  })
  @IsNumber({}, { message: 'Value Received must be a number.' })
  @IsNotEmpty({ message: 'Value Received is required.' })
  valueReceived: number;

  @ApiProperty({
    example: 100.00,
    description: 'The value in the base currency.',
  })
  @IsNumber({}, { message: 'Value must be a number.' })
  @IsNotEmpty({ message: 'Value is required.' })
  value: number;

  @ApiProperty({
    example: FormOfPaymentCurrency.PIX,
    description: 'The form of payment currency.',
    enum: FormOfPaymentCurrency,
    required: false,
  })
  @IsEnum(FormOfPaymentCurrency, { message: 'Form Of Payment Currency must be a valid enum value.' })
  @IsOptional()
  formOfPaymentCurrency?: FormOfPaymentCurrency;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the payment was made.',
  })
  @IsDateString({}, { message: 'Payment At must be a valid date string.' })
  @IsNotEmpty({ message: 'Payment At is required.' })
  paymentAt: string;
}
