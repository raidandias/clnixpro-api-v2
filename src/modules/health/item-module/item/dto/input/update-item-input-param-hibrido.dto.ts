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

export class UpdateItemInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemInputBodyDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The account ID associated with the item.',
    required: false,
  })
  accountId?: string;

  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The supplier ID associated with the item.',
    required: false,
  })
  supplierId?: string;

  @ApiProperty({ example: 'Item Name', description: 'The name of the item.' })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name: string;

  @ApiProperty({
    example: 'Detailed description of the item.',
    description: 'The item&#x27;s description.',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description: string;
}
