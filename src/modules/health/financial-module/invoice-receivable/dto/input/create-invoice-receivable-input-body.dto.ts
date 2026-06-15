import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateInvoiceReceivableInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the invoice receivable.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-234567890abc',
    description: 'The order associated with the invoice receivable.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The customer associated with the invoice receivable.',
  })
  @IsString({ message: 'Customer ID must be a string.' })
  @IsUUID(4, { message: 'Customer ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Customer ID is required.' })
  customerId: string;

  @ApiProperty({
    example: 'AUTH-123456',
    description: 'The authorization number for the invoice receivable.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Authorization number must be a string.' })
  @IsOptional()
  authorizationNumber?: string;

  @ApiProperty({
    example: 1,
    description: 'The installment number for the invoice receivable.',
    required: false,
  })
  @IsInt({ message: 'Installment must be an integer.' })
  @IsOptional()
  installment?: number;

  @ApiProperty({
    example: 100.00,
    description: 'The total value of the invoice receivable.',
  })
  @IsNumber({}, { message: 'Value total must be a number.' })
  @IsNotEmpty({ message: 'Value total is required.' })
  valueTotal: number;

  @ApiProperty({
    example: 0.00,
    description: 'The discount value of the invoice receivable.',
    required: false,
  })
  @IsNumber({}, { message: 'Value discount must be a number.' })
  @IsOptional()
  valueDiscount?: number;

  @ApiProperty({
    example: 0.00,
    description: 'The fixed fees value of the invoice receivable.',
    required: false,
  })
  @IsNumber({}, { message: 'Value fees fixed must be a number.' })
  @IsOptional()
  valueFeesFixed?: number;

  @ApiProperty({
    example: 0.00,
    description: 'The percentage fees value of the invoice receivable.',
    required: false,
  })
  @IsNumber({}, { message: 'Value fees percent must be a number.' })
  @IsOptional()
  valueFeesPercent?: number;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The due date of the invoice receivable.',
  })
  @IsDateString({}, { message: 'Due date must be a valid ISO date string.' })
  @IsNotEmpty({ message: 'Due date is required.' })
  dueAt: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The payment date of the invoice receivable.',
    required: false,
    nullable: true,
  })
  @IsDateString({}, { message: 'Payment date must be a valid ISO date string.' })
  @IsOptional()
  paymentAt?: string;
}
