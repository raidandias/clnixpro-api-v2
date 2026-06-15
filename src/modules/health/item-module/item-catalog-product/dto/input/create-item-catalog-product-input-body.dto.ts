import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateItemCatalogProductInputBodyDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
    required: false,
  })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({ example: 'Item Title', description: 'The title of the item.' })
  @IsString({ message: 'Title must be a string.' })
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
  })
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @ApiProperty({ example: 100.0, description: 'The price of the item.' })
  @IsNumber({}, { message: 'Price must be a valid decimal.' })
  price: number;

  @ApiProperty({ example: 50.89, description: 'The cost price of the item.' })
  @IsNumber({}, { message: 'Cost price must be a valid decimal.' })
  costPrice: number;

  @ApiProperty({
    example: 'Example Manufacturer',
    description: 'The manufacturer of the item.',
  })
  @IsString({ message: 'Manufacturer must be a string.' })
  manufacturer?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'The expiry date of the item.',
  })
  @IsString({ message: 'Expiry date must be a valid date.' })
  expiryAt?: string;
}
