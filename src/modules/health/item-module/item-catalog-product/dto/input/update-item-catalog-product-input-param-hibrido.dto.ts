import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateItemCatalogProductInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemCatalogProductInputBodyDto {
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
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Item Title', description: 'The title of the item.' })
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '100', description: 'The price of the item.' })
  @IsNumber({}, { message: 'Price must be a valid decimal.' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: '50', description: 'The cost price of the item.' })
  @IsNumber({}, { message: 'Cost price must be a valid decimal.' })
  @IsOptional()
  costPrice?: number;

  @ApiProperty({
    example: 'Example Manufacturer',
    description: 'The manufacturer of the item.',
  })
  @IsString({ message: 'Manufacturer must be a string.' })
  @IsOptional()
  manufacturer?: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'The expiry date of the item.',
  })
  @IsString({ message: 'Expiry date must be a valid date.' })
  @IsOptional()
  expiryAt?: string;
}
