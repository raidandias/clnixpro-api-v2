import { ApiProperty } from '@nestjs/swagger';
import { TypeCurrencyExchange, FormOfPaymentCurrency } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class FindAllOrderPaymentCurrencyInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order payment currency.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the payment currency.',
    required: false,
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsOptional()
  orderId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order payment associated with this currency entry.',
    required: false,
  })
  @IsString({ message: 'Order Payment ID must be a string.' })
  @IsOptional()
  orderPaymentId?: string;

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
    example: FormOfPaymentCurrency.PIX,
    description: 'The form of payment currency.',
    enum: FormOfPaymentCurrency,
    required: false,
  })
  @IsEnum(FormOfPaymentCurrency, { message: 'Form Of Payment Currency must be a valid enum value.' })
  @IsOptional()
  formOfPaymentCurrency?: FormOfPaymentCurrency;

  @ApiProperty({
    example: 1,
    description: 'Page number.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    required: false,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  perPage?: number;
}
