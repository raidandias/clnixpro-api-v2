import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsDateString } from 'class-validator';

export class CreateOrderPaymentInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order payment.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the payment.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order item associated with the payment.',
  })
  @IsString({ message: 'Order Item ID must be a string.' })
  @IsUUID(4, { message: 'Order Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order Item ID is required.' })
  orderItemId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The professional associated with the payment.',
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Professional ID is required.' })
  professionalId: string;

  @ApiProperty({
    example: 100.00,
    description: 'The payment value.',
  })
  @IsNumber({}, { message: 'Value Payment must be a number.' })
  @IsNotEmpty({ message: 'Value Payment is required.' })
  valuePayment: number;

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
  })
  @IsNumber({}, { message: 'Value Total must be a number.' })
  @IsNotEmpty({ message: 'Value Total is required.' })
  valueTotal: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the payment was made.',
  })
  @IsDateString({}, { message: 'Payment At must be a valid date string.' })
  @IsNotEmpty({ message: 'Payment At is required.' })
  paymentAt: string;
}
