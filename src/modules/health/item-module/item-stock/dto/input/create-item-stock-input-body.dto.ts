import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateItemStockInputBodyDto {
  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
  })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item catalog ID is required.' })
  itemCatalogId: string;

  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
  })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item catalog ID is required.' })
  accountId: string;

  @ApiProperty({
    example: 10,
    description: 'The current amount of items in stock',
  })
  @IsNumber({}, { message: 'Current amount must be an integer.' })
  @IsNotEmpty({ message: 'Current amount is required.' })
  currentAmount: number;

  @ApiProperty({
    example: 5,
    description: 'The amount of items output from stock',
  })
  @IsNumber({}, { message: 'Output amount must be an integer.' })
  @IsNotEmpty({ message: 'Output amount is required.' })
  outputAmount: number;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'The location of the item in stock',
  })
  @IsString({ message: 'Location must be a string.' })
  @IsNotEmpty({ message: 'Location is required.' })
  location: string;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item was entered into stock',
  })
  @IsNotEmpty({ message: 'Entry date is required.' })
  entryAt: Date;

  @ApiProperty({
    example: '2023-07-05T00:00:00.000Z',
    description: 'The date and time the item was output from stock',
  })
  @IsOptional()
  outputAt?: Date;
}
