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

export class CreateItemCatalogExamInputBodyDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Item ID is required.' })
  itemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related account.',
    required: false,
  })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Example Item',
    description: 'The name of the item.',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({ example: 'Item Title', description: 'The title of the item.' })
  @IsString({ message: 'Title must be a string.' })
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
  })
  @IsString({ message: 'Description must be a string.' })
  description?: string;

  @ApiProperty({ example: 100.87, description: 'The price of the item.' })
  @IsNumber({}, { message: 'Price must be a number.' })
  price?: number;

  @ApiProperty({ example: 50.45, description: 'The cost price of the item.' })
  @IsNumber({}, { message: 'Cost price must be a number.' })
  costPrice?: number;

  @ApiProperty({
    example: false,
    description: 'Indicates if the item has a benefit.',
  })
  @IsBoolean({ message: 'Flag benefit must be a boolean.' })
  flagBenefit?: boolean;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
  })
  @IsNumber({}, { message: 'Duration must be a number.' })
  duration?: number;

  @ApiProperty({
    example: BodyMembers.ARMS,
    description: 'The body members related to the item.',
    enum: BodyMembers,
  })
  @IsString({ message: 'Body members must be a valid enum value.' })
  bodyMembers: BodyMembers;

  @ApiProperty({
    example: 'General Exam',
    description: 'The type of exam for the item.',
  })
  @IsString({ message: 'Type of exam must be a string.' })
  typeExam?: string;

  @ApiProperty({
    example: 'Standard Protocol',
    description: 'The protocol associated with the item.',
  })
  @IsString({ message: 'Protocol must be a string.' })
  protocol?: string;

  @ApiProperty({
    example: 'Specific indications for the item.',
    description: 'The indications for the item.',
  })
  @IsString({ message: 'Indications must be a string.' })
  indications: string;

  @ApiProperty({
    example: 'Professional observation details.',
    description: 'The observation for professional regarding the item.',
  })
  @IsString({ message: 'Observation for professional must be a string.' })
  observationForProfessional?: string;

  @ApiProperty({
    example: 'Patient observation details.',
    description: 'The observation for patient regarding the item.',
  })
  @IsString({ message: 'Observation for patient must be a string.' })
  observationForPatient?: string;
}
