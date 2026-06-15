import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class FindAllItemStockInputQueryDto {
  @ApiProperty({
    example: 'e7d62e5a-3b77-49ed-9dd4-c66d43f5af0f',
    description: 'The unique identifier for the item stock',
    required: false,
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
    required: false,
  })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  @IsOptional()
  itemCatalogId?: string;

  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
    required: false,
  })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 10,
    description: 'The current amount of items in stock',
    required: false,
  })
  @IsString({ message: 'Current amount must be an integer.' })
  @IsOptional()
  currentAmount?: string;

  @ApiProperty({
    example: 5,
    description: 'The amount of items output from stock',
    required: false,
  })
  @IsString({ message: 'Output amount must be an integer.' })
  @IsOptional()
  outputAmount?: string;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'The location of the item in stock',
    required: false,
  })
  @IsString({ message: 'Location must be a string.' })
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item was entered into stock',
    required: false,
  })
  @IsString({ message: 'Entry date must be a valid date.' })
  @IsOptional()
  entryAt?: string;

  @ApiProperty({
    example: '2023-07-05T00:00:00.000Z',
    description: 'The date and time the item was output from stock',
    required: false,
  })
  @IsString({ message: 'Output date must be a valid date.' })
  @IsOptional()
  outputAt?: string;

  @ApiProperty({
    example: '2023-06-01T00:00:00.000Z',
    description: 'The date and time the item stock record was created',
    required: false,
  })
  @IsString({ message: 'Creation date must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item stock record was last updated',
    required: false,
  })
  @IsString({ message: 'Update date must be a valid date.' })
  @IsOptional()
  updatedAt?: string;

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
