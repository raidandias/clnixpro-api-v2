import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllItemInstrumentInputQueryDto {
  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The unique identifier of the item instrument',
    required: false,
  })
  @IsString({ message: 'ID must be a string.' })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id: string;

  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the item instrument',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId: string;

  @ApiProperty({
    example: 'edc5f7b4-8d8f-4c4c-8d7b-1e8f7d9b03d3',
    description: 'The item ID associated with the item instrument',
    required: false,
  })
  @IsString({ message: 'Item ID must be a string.' })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description:
      'The item catalog product ID associated with the item instrument',
    required: false,
  })
  @IsString({ message: 'Item Catalog Product ID must be a string.' })
  @IsUUID(4, { message: 'Item Catalog Product ID must be a valid UUID.' })
  @IsOptional()
  itemCatalogProductId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description:
      'The item catalog service ID associated with the item instrument',
    required: false,
  })
  @IsString({ message: 'Item Catalog Service ID must be a string.' })
  @IsUUID(4, { message: 'Item Catalog Service ID must be a valid UUID.' })
  @IsOptional()
  itemCatalogServiceId: string;

  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was created',
    required: false,
  })
  @IsString({ message: 'Created At must be a valid date string.' })
  @IsOptional()
  createdAt: string;

  @ApiProperty({
    example: '2024-07-11T00:00:00Z',
    description: 'The date and time when the item instrument was last updated',
    required: false,
  })
  @IsString({ message: 'Updated At must be a valid date string.' })
  @IsOptional()
  updatedAt: string;

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
