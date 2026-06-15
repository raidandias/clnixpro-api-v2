import { ApiProperty } from '@nestjs/swagger';
import { FormOfPaymentCurrency } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class FindAllInvoicePaymentInputQueryDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the invoice payment.', required: false })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({ example: 'b2c3d4e5-6789-01bc-defa-234567890abc', description: 'The invoice receivable associated with this payment.', required: false })
  @IsString({ message: 'Invoice Receivable ID must be a string.' })
  @IsOptional()
  invoiceReceivableId?: string;

  @ApiProperty({ example: 'c3d4e5f6-7890-12cd-efab-3456789012cd', description: 'The invoice payable associated with this payment.', required: false })
  @IsString({ message: 'Invoice Payable ID must be a string.' })
  @IsOptional()
  invoicePayableId?: string;

  @ApiProperty({ example: FormOfPaymentCurrency.CASH, description: 'The form of payment.', enum: FormOfPaymentCurrency, required: false })
  @IsEnum(FormOfPaymentCurrency, { message: 'Form of payment must be a valid enum value.' })
  @IsOptional()
  formOfPayment?: FormOfPaymentCurrency;

  @ApiProperty({ example: 1, description: 'Current page number.', required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 10, description: 'Number of items per page.', required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  perPage?: number;
}
