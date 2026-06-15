import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsEnum } from 'class-validator';

export class UpdateStatementInputParamDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', description: 'The unique identifier of the statement.' })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateStatementInputBodyDto {
  @ApiProperty({ example: 100.00, description: 'The amount of the statement transaction.', required: false })
  @IsNumber({}, { message: 'Amount must be a number.' })
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: TransactionType.RECEIVABLE, description: 'The type of the transaction.', enum: TransactionType, required: false })
  @IsEnum(TransactionType, { message: 'Transaction type must be a valid enum value.' })
  @IsOptional()
  transactionType?: TransactionType;
}
