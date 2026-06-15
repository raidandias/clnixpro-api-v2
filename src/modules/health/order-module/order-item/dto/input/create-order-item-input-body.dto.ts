import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderItemInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the order item.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The order associated with the order item.',
  })
  @IsString({ message: 'Order ID must be a string.' })
  @IsUUID(4, { message: 'Order ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Order ID is required.' })
  orderId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The item associated with the order item.',
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The item catalog associated with the order item.',
  })
  @IsString({ message: 'Item Catalog ID must be a string.' })
  @IsUUID(4, { message: 'Item Catalog ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item Catalog ID is required.' })
  itemCatalogId: string;

  @ApiProperty({
    example: 1,
    description: 'The quantity of the item in the order.',
    required: false,
  })
  @IsNumber({}, { message: 'Quantity must be a number.' })
  @IsOptional()
  quantity?: number;
}
