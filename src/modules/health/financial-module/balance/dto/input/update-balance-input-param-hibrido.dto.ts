import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class UpdateBalanceInputParamDto {
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', description: 'The unique identifier of the balance.' })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateBalanceInputBodyDto {
  @ApiProperty({ example: 100.00, description: 'The total receivable amount.', required: false })
  @IsNumber({}, { message: 'Total receivable must be a number.' })
  @IsOptional()
  totalReceivable?: number;

  @ApiProperty({ example: 50.00, description: 'The total payable amount.', required: false })
  @IsNumber({}, { message: 'Total payable must be a number.' })
  @IsOptional()
  totalPayable?: number;

  @ApiProperty({ example: 50.00, description: 'The current balance amount.', required: false })
  @IsNumber({}, { message: 'Current balance must be a number.' })
  @IsOptional()
  currentBalance?: number;
}
