import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateBalanceInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the balance.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({ example: 100.00, description: 'The total receivable amount.' })
  @IsNumber({}, { message: 'Total receivable must be a number.' })
  @IsNotEmpty({ message: 'Total receivable is required.' })
  totalReceivable: number;

  @ApiProperty({ example: 50.00, description: 'The total payable amount.' })
  @IsNumber({}, { message: 'Total payable must be a number.' })
  @IsNotEmpty({ message: 'Total payable is required.' })
  totalPayable: number;

  @ApiProperty({ example: 50.00, description: 'The current balance amount.' })
  @IsNumber({}, { message: 'Current balance must be a number.' })
  @IsNotEmpty({ message: 'Current balance is required.' })
  currentBalance: number;
}
