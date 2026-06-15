import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class FindAllItemCatalogProductInputQueryDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier for the item.',
    required: false,
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
    required: false,
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
    required: false,
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Item Title',
    description: 'The title of the item.',
    required: false,
  })
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 100.89,
    description: 'The price of the item.',
    required: false,
  })
  @IsString({ message: 'Price must be a valid decimal.' })
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 50.54,
    description: 'The cost price of the item.',
    required: false,
  })
  @IsString({ message: 'Cost price must be a valid decimal.' })
  @IsOptional()
  costPrice?: number;

  @ApiProperty({
    example: 'Example Manufacturer',
    description: 'The manufacturer of the item.',
    required: false,
  })
  @IsString({ message: 'Manufacturer must be a string.' })
  @IsOptional()
  manufacturer?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'The expiry date of the item.',
    required: false,
  })
  @IsString({ message: 'Expiry date must be a valid date.' })
  @IsOptional()
  expiryAt?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The creation date of the item.',
    required: false,
  })
  @IsString({ message: 'Created date must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The last update date of the item.',
    required: false,
  })
  @IsString({ message: 'Updated date must be a valid date.' })
  @IsOptional()
  updatedAt?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The deletion date of the item.',
    required: false,
  })
  @IsString({ message: 'Deleted date must be a valid date.' })
  @IsOptional()
  deletedAt?: string;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage?: string;
}
