import { ApiProperty } from '@nestjs/swagger';
import { FormOfPaymentCurrency, TypeCurrencyExchange } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateInvoicePaymentInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the invoice payment.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The invoice receivable associated with this payment.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Invoice Receivable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Receivable ID must be a valid UUID.' })
  @IsOptional()
  invoiceReceivableId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The invoice payable associated with this payment.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Invoice Payable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Payable ID must be a valid UUID.' })
  @IsOptional()
  invoicePayableId?: string;

  @ApiProperty({
    example: 'Payment denied due to insufficient funds.',
    description: 'The description for a denied payment.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Description denied must be a string.' })
  @IsOptional()
  descriptionDenied?: string;

  @ApiProperty({ example: 100.00, description: 'The payment value.' })
  @IsNumber({}, { message: 'Value payment must be a number.' })
  @IsNotEmpty({ message: 'Value payment is required.' })
  valuePayment: number;

  @ApiProperty({ example: 0.00, description: 'The discount value of the invoice payment.', required: false })
  @IsNumber({}, { message: 'Value discount must be a number.' })
  @IsOptional()
  valueDiscount?: number;

  @ApiProperty({ example: 0.00, description: 'The fixed fees value of the invoice payment.', required: false })
  @IsNumber({}, { message: 'Value fees fixed must be a number.' })
  @IsOptional()
  valueFeesFixed?: number;

  @ApiProperty({ example: 0.00, description: 'The percentage fees value of the invoice payment.', required: false })
  @IsNumber({}, { message: 'Value fees percent must be a number.' })
  @IsOptional()
  valueFeesPercent?: number;

  @ApiProperty({
    example: FormOfPaymentCurrency.CASH,
    description: 'The form of payment.',
    enum: FormOfPaymentCurrency,
    required: false,
  })
  @IsEnum(FormOfPaymentCurrency, { message: 'Form of payment must be a valid enum value.' })
  @IsOptional()
  formOfPayment?: FormOfPaymentCurrency;

  @ApiProperty({
    example: TypeCurrencyExchange.BRL,
    description: 'The type of currency exchange.',
    enum: TypeCurrencyExchange,
    required: false,
  })
  @IsEnum(TypeCurrencyExchange, { message: 'Type currency exchange must be a valid enum value.' })
  @IsOptional()
  typeCurrencyExchange?: TypeCurrencyExchange;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date.' })
  @IsDateString({}, { message: 'Payment date must be a valid ISO date string.' })
  @IsNotEmpty({ message: 'Payment date is required.' })
  paymentAt: string;
}
