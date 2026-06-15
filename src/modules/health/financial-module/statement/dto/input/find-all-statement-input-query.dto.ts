import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class FindAllStatementInputQueryDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab', description: 'The account associated with the statement.', required: false })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({ example: TransactionType.RECEIVABLE, description: 'The type of the transaction.', enum: TransactionType, required: false })
  @IsEnum(TransactionType, { message: 'Transaction type must be a valid enum value.' })
  @IsOptional()
  transactionType?: TransactionType;

  @ApiProperty({ example: 1, description: 'Current page number.', required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 10, description: 'Number of items per page.', required: false })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  perPage?: number;
}
