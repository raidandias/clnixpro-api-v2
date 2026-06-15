import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class UpdateOrderPaymentInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the order payment.',
  })
  @IsString({ message: 'ID must be a string.' })
  @IsNotEmpty({ message: 'ID is required.' })
  @IsUUID(4, { message: 'ID must be a valid UUIDv4.' })
  id: string;
}

export class UpdateOrderPaymentInputBodyDto {
  @ApiProperty({
    example: 100.00,
    description: 'The payment value.',
    required: false,
  })
  @IsNumber({}, { message: 'Value Payment must be a number.' })
  @IsOptional()
  valuePayment?: number;

  @ApiProperty({
    example: 10.00,
    description: 'The discount value applied to the payment.',
    required: false,
  })
  @IsNumber({}, { message: 'Value Discount must be a number.' })
  @IsOptional()
  valueDiscount?: number;

  @ApiProperty({
    example: 90.00,
    description: 'The total value after discount.',
    required: false,
  })
  @IsNumber({}, { message: 'Value Total must be a number.' })
  @IsOptional()
  valueTotal?: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the payment was made.',
    required: false,
  })
  @IsDateString({}, { message: 'Payment At must be a valid date string.' })
  @IsOptional()
  paymentAt?: string;
}
