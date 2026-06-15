import { ApiProperty } from '@nestjs/swagger';
import { BodyMembers } from '@prisma/client';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateItemCatalogServiceInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemCatalogServiceInputBodyDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
  })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
  })
  @IsString({ message: 'Name must be a string.' })
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

  @ApiProperty({ example: 100.76, description: 'The price of the item.' })
  @IsNumber({}, { message: 'Price must be a valid decimal.' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 50.76, description: 'The cost price of the item.' })
  @IsNumber({}, { message: 'Cost price must be a valid decimal.' })
  @IsOptional()
  costPrice?: number;

  @ApiProperty({
    example: true,
    description: 'Indicates if the item has a benefit.',
  })
  @IsBoolean({ message: 'Flag benefit must be a boolean.' })
  @IsOptional()
  flagBenefit?: boolean;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
  })
  @IsNumber({}, { message: 'Duration must be an integer.' })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    example: 'ARMS',
    description: 'The body members related to the item.',
    enum: BodyMembers,
  })
  @IsString({ message: 'Body members must be a valid enum value.' })
  @IsOptional()
  bodyMembers?: BodyMembers;

  @ApiProperty({
    example: 'Professional observation details.',
    description: 'The observation for professional regarding the item.',
  })
  @IsString({ message: 'Observation for professional must be a string.' })
  @IsOptional()
  observationForProfessional?: string;

  @ApiProperty({
    example: 'Patient observation details.',
    description: 'The observation for patient regarding the item.',
  })
  @IsString({ message: 'Observation for patient must be a string.' })
  @IsOptional()
  observationForPatient?: string;
}
