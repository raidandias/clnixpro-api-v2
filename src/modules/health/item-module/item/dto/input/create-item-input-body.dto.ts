import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { IsUUID, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemInputBodyDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The associated account ID',
    required: false,
  })
  @Optional()
  accountId?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The supplier ID associated with the item.',
    required: false,
  })
  @IsUUID(4, { message: 'Supplier ID must be a valid UUID.' })
  @IsOptional()
  supplierId?: string;

  @ApiProperty({ example: 'Item Name', description: 'The name of the item.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  name: string;

  @ApiProperty({
    example: 'Detailed description of the item.',
    description: 'The item description.',
  })
  @IsString({ message: 'Description must be a string.' })
  description: string;

  @ApiProperty({
    example: ItemCategory.PRODUCT,
    description: 'The category of the item.',
    enum: ItemCategory,
  })
  @IsString({
    message:
      'Category must be either &#x27;SERVICE&#x27; or &#x27;PRODUCT&#x27;.',
  })
  category: ItemCategory;
}
