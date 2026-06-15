import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsEnum } from 'class-validator';

export class CreateStatementInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the statement.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The invoice receivable associated with the statement.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Invoice Receivable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Receivable ID must be a valid UUID.' })
  @IsOptional()
  invoiceReceivableId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The invoice payable associated with the statement.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Invoice Payable ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Payable ID must be a valid UUID.' })
  @IsOptional()
  invoicePayableId?: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The invoice payment associated with the statement.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Invoice Payment ID must be a string.' })
  @IsUUID(4, { message: 'Invoice Payment ID must be a valid UUID.' })
  @IsOptional()
  invoicePaymentId?: string;

  @ApiProperty({ example: 100.00, description: 'The amount of the statement transaction.' })
  @IsNumber({}, { message: 'Amount must be a number.' })
  @IsNotEmpty({ message: 'Amount is required.' })
  amount: number;

  @ApiProperty({
    example: TransactionType.RECEIVABLE,
    description: 'The type of the transaction.',
    enum: TransactionType,
  })
  @IsEnum(TransactionType, { message: 'Transaction type must be a valid enum value.' })
  @IsNotEmpty({ message: 'Transaction type is required.' })
  transactionType: TransactionType;
}
