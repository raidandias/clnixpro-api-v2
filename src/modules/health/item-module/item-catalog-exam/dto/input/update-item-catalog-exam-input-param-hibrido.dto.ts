import { ApiProperty } from '@nestjs/swagger';
import { BodyMembers } from '@prisma/client';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class UpdateItemCatalogExamInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateItemCatalogExamInputBodyDto {
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

  @ApiProperty({ example: '100', description: 'The price of the item.' })
  @IsNumber({}, { message: 'Price must be a valid decimal.' })
  @IsOptional()
  price?: number;

  @ApiProperty({ example: '50', description: 'The cost price of the item.' })
  @IsNumber({}, { message: 'Cost price must be a valid decimal.' })
  @IsOptional()
  costPrice?: number;

  @ApiProperty({
    example: false,
    description: 'Indicates if the item has a benefit.',
  })
  @IsBoolean({ message: 'Flag benefit must be a boolean.' })
  @IsOptional()
  flagBenefit?: boolean;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
  })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    example: BodyMembers.ABDOMEN,
    description: 'The body members related to the item.',
    enum: BodyMembers,
  })
  @IsString({ message: 'Body members must be a valid enum value.' })
  @IsOptional()
  bodyMembers: BodyMembers;

  @ApiProperty({
    example: 'General Exam',
    description: 'The type of exam for the item.',
  })
  @IsString({ message: 'Type of exam must be a string.' })
  @IsOptional()
  typeExam?: string;

  @ApiProperty({
    example: 'Standard Protocol',
    description: 'The protocol associated with the item.',
  })
  @IsString({ message: 'Protocol must be a string.' })
  @IsOptional()
  protocol?: string;

  @ApiProperty({
    example: 'Specific indications for the item.',
    description: 'The indications for the item.',
  })
  @IsString({ message: 'Indications must be a string.' })
  @IsOptional()
  indications?: string;

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
