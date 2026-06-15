import { ApiProperty } from '@nestjs/swagger';
import { FormOfPaymentCurrency, TypeCurrencyExchange } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class UpdateInvoicePaymentInputParamDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', description: 'The unique identifier of the invoice payment.' })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateInvoicePaymentInputBodyDto {
  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The invoice receivable associated with this payment.', required: false, nullable: true })
  @IsString({ message: 'Invoice Receivable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Receivable ID must be a valid UUID.' })
  @IsOptional()
  invoiceReceivableId?: string;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The invoice payable associated with this payment.', required: false, nullable: true })
  @IsString({ message: 'Invoice Payable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Payable ID must be a valid UUID.' })
  @IsOptional()
  invoicePayableId?: string;

  @ApiProperty({ example: 'Payment denied due to insufficient funds.', description: 'The description for a denied payment.', required: false, nullable: true })
  @IsString({ message: 'Description denied must be a string.' })
  @IsOptional()
  descriptionDenied?: string;

  @ApiProperty({ example: 100.00, description: 'The payment value.', required: false })
  @IsNumber({}, { message: 'Value payment must be a number.' })
  @IsOptional()
  valuePayment?: number;

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

  @ApiProperty({ example: FormOfPaymentCurrency.CASH, description: 'The form of payment.', enum: FormOfPaymentCurrency, required: false })
  @IsEnum(FormOfPaymentCurrency, { message: 'Form of payment must be a valid enum value.' })
  @IsOptional()
  formOfPayment?: FormOfPaymentCurrency;

  @ApiProperty({ example: TypeCurrencyExchange.BRL, description: 'The type of currency exchange.', enum: TypeCurrencyExchange, required: false })
  @IsEnum(TypeCurrencyExchange, { message: 'Type currency exchange must be a valid enum value.' })
  @IsOptional()
  typeCurrencyExchange?: TypeCurrencyExchange;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date.', required: false })
  @IsDateString({}, { message: 'Payment date must be a valid ISO date string.' })
  @IsOptional()
  paymentAt?: string;
}
