import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateOrderProfessionalInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order professional.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order professional.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The order item associated with the order professional.',
    required: false,
    nullable: true,
  })
  @IsString({ message: 'Order Item ID must be a string.' })
  @IsUUID(4, { message: 'Order Item ID must be a valid UUID.' })
  @IsOptional()
  orderItemId?: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The professional associated with the order.',
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Professional ID is required.' })
  professionalId: string;
}
