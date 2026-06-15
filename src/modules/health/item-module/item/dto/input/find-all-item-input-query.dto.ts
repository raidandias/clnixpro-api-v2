import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import {
  IsUUID,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class FindAllItemInputQueryDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Unique identifier for the item.',
    required: false,
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The supplier ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID.' })
  @IsOptional()
  supplierId?: string;

  @ApiProperty({
    example: 'Item Name',
    description: 'The name of the item.',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Detailed description of the item.',
    description: 'The item&#x27;s description.',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'SERVICE',
    description: 'The category of the item.',
    enum: ItemCategory,
    required: false,
  })
  @IsString({
    message:
      'Category must be either &#x27;SERVICE&#x27; or &#x27;PRODUCT&#x27;.',
  })
  @IsOptional()
  category?: ItemCategory;

  @ApiProperty({ example: '1', description: 'Page actual', required: true })
  @IsString({ message: 'Page must be a string.' })
  @IsNotEmpty({ message: 'Page is required.' })
  page?: string;

  @ApiProperty({
    example: '20',
    description: 'Quantity itens per page',
    required: true,
  })
  @IsString({ message: 'Per page must be a string.' })
  @IsNotEmpty({ message: 'Per page is required.' })
  perPage?: string;
}
