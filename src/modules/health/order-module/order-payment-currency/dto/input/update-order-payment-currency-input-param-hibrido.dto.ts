import { ApiProperty } from '@nestjs/swagger';
import { TypeCurrencyExchange, FormOfPaymentCurrency } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class UpdateOrderPaymentCurrencyInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order payment currency.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderPaymentCurrencyInputBodyDto {
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
    required: false,
  })
  @IsNumber({}, { message: 'Value Received must be a number.' })
  @IsOptional()
  valueReceived?: number;

  @ApiProperty({
    example: 100.00,
    description: 'The value in the base currency.',
    required: false,
  })
  @IsNumber({}, { message: 'Value must be a number.' })
  @IsOptional()
  value?: number;

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
    required: false,
  })
  @IsDateString({}, { message: 'Payment At must be a valid date string.' })
  @IsOptional()
  paymentAt?: string;
}
