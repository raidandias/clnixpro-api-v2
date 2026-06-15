import { ApiProperty } from '@nestjs/swagger';
import { BodyMembers } from '@prisma/client';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class FindAllItemCatalogExamInputQueryDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier for the item.',
    required: false,
  })
  @IsUUID(4, { message: 'ID must be a valid UUID.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the related item.',
    required: false,
  })
  @IsUUID(4, { message: 'Item ID must be a valid UUID.' })
  @IsOptional()
  itemId?: string;

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
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'Item Title',
    description: 'The title of the item.',
    required: false,
  })
  @IsString({ message: 'Title must be a string.' })
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is a detailed description of the item.',
    description: 'The description of the item.',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '100',
    description: 'The price of the item.',
    required: false,
  })
  @IsString({ message: 'Price must be a valid decimal.' })
  @IsOptional()
  price?: string;

  @ApiProperty({
    example: '50',
    description: 'The cost price of the item.',
    required: false,
  })
  @IsString({ message: 'Cost price must be a valid decimal.' })
  @IsOptional()
  costPrice?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the item has a benefit.',
    required: false,
  })
  @IsString({ message: 'Flag benefit must be a boolean.' })
  @IsOptional()
  flagBenefit?: string;

  @ApiProperty({
    example: 30,
    description: 'The duration of the item in minutes.',
    required: false,
  })
  @IsString({ message: 'Duration must be an integer.' })
  @IsOptional()
  duration?: string;

  @ApiProperty({
    example: BodyMembers.ARMS,
    description: 'The body members related to the item.',
    required: false,
    enum: BodyMembers,
  })
  @IsString({ message: 'Body members must be a valid enum value.' })
  @IsOptional()
  bodyMembers?: BodyMembers;

  @ApiProperty({
    example: 'General Exam',
    description: 'The type of exam for the item.',
    required: false,
  })
  @IsString({ message: 'Type of exam must be a string.' })
  @IsOptional()
  typeExam?: string;

  @ApiProperty({
    example: 'Standard Protocol',
    description: 'The protocol associated with the item.',
    required: false,
  })
  @IsString({ message: 'Protocol must be a string.' })
  @IsOptional()
  protocol?: string;

  @ApiProperty({
    example: 'Specific indications for the item.',
    description: 'The indications for the item.',
    required: false,
  })
  @IsString({ message: 'Indications must be a string.' })
  @IsOptional()
  indications?: string;

  @ApiProperty({
    example: 'Professional observation details.',
    description: 'The observation for professional regarding the item.',
    required: false,
  })
  @IsString({ message: 'Observation for professional must be a string.' })
  @IsOptional()
  observationForProfessional?: string;

  @ApiProperty({
    example: 'Patient observation details.',
    description: 'The observation for patient regarding the item.',
    required: false,
  })
  @IsString({ message: 'Observation for patient must be a string.' })
  @IsOptional()
  observationForPatient?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The creation date of the item.',
    required: false,
  })
  @IsString({ message: 'Created date must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The last update date of the item.',
    required: false,
  })
  @IsString({ message: 'Updated date must be a valid date.' })
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
