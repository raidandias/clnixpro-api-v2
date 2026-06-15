import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateInvoicePayableInputParamDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', description: 'The unique identifier of the invoice payable.' })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateInvoicePayableInputBodyDto {
  @ApiProperty({ example: 100.00, description: 'The total value of the invoice payable.', required: false })
  @IsNumber({}, { message: 'Value total must be a number.' })
  @IsOptional()
  valueTotal?: number;

  @ApiProperty({ example: 0.00, description: 'The discount value of the invoice payable.', required: false })
  @IsNumber({}, { message: 'Value discount must be a number.' })
  @IsOptional()
  valueDiscount?: number;

  @ApiProperty({ example: 0.00, description: 'The fixed fees value of the invoice payable.', required: false })
  @IsNumber({}, { message: 'Value fees fixed must be a number.' })
  @IsOptional()
  valueFeesFixed?: number;

  @ApiProperty({ example: 0.00, description: 'The percentage fees value of the invoice payable.', required: false })
  @IsNumber({}, { message: 'Value fees percent must be a number.' })
  @IsOptional()
  valueFeesPercent?: number;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The due date of the invoice payable.', required: false })
  @IsDateString({}, { message: 'Due date must be a valid ISO date string.' })
  @IsOptional()
  dueAt?: string;

  @ApiProperty({ example: '2024-01-15T10:00:00Z', description: 'The payment date of the invoice payable.', required: false, nullable: true })
  @IsDateString({}, { message: 'Payment date must be a valid ISO date string.' })
  @IsOptional()
  paymentAt?: string;
}
