import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateItemStockInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemStockInputBodyDto {
  @ApiProperty({
    example: 'c7e8c317-bd17-41b8-9fa5-9b714e707e70',
    description: 'The ID of the related item catalog',
  })
  @IsUUID(4, { message: 'Item catalog ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 10,
    description: 'The current amount of items in stock',
  })
  @IsNumber({}, { message: 'Current amount must be an integer.' })
  @IsOptional()
  currentAmount?: number;

  @ApiProperty({
    example: 5,
    description: 'The amount of items output from stock',
  })
  @IsNumber({}, { message: 'Output amount must be an integer.' })
  @IsOptional()
  outputAmount?: number;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'The location of the item in stock',
  })
  @IsString({ message: 'Location must be a string.' })
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: '2023-07-01T00:00:00.000Z',
    description: 'The date and time the item was entered into stock',
  })
  @IsString({ message: 'Entry date must be a valid date.' })
  @IsOptional()
  entryAt?: Date;

  @ApiProperty({
    example: '2023-07-05T00:00:00.000Z',
    description: 'The date and time the item was output from stock',
  })
  @IsString({ message: 'Output date must be a valid date.' })
  @IsOptional()
  outputAt?: Date;
}
