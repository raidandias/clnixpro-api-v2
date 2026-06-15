import { ApiProperty } from '@nestjs/swagger';
import { TypeReturn } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class FindAllHealthInsuranceInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier for the health insurance.',
    required: false,
  })
  @IsString({ message: 'ID must be a string.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the health insurance.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'Health Plan A',
    description: 'The name of the health insurance.',
    required: false,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'false',
    description: 'Indicates if the health insurance is corporate.',
    required: false,
  })
  @IsString({ message: 'Flag Corporate must be a string.' })
  @IsOptional()
  flagCoperate?: string;

  @ApiProperty({
    example: 100.9,
    description: 'The cost price of the health insurance.',
    required: false,
  })
  @IsString({ message: 'Cost Price must be a number.' })
  @IsOptional()
  costPrice: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth related to the health insurance.',
    required: false,
  })
  @IsString({ message: 'Date of Birthday must be a string.' })
  @IsOptional()
  dateOfBirthday?: string;

  @ApiProperty({
    example: '/documents/health-insurance.pdf',
    description: 'The path to the document of the health insurance.',
    required: false,
  })
  @IsString({ message: 'Path Document must be a string.' })
  @IsOptional()
  pathDocument?: string;

  @ApiProperty({
    example: '/logo/health-insurance.png',
    description: 'The path to the logo of the health insurance.',
    required: false,
  })
  @IsString({ message: 'Path Logo must be a string.' })
  @IsOptional()
  pathLogo?: string;

  @ApiProperty({
    example: 'NOT_RETURN',
    description: 'The type of return for the health insurance.',
    required: false,
    enum: TypeReturn,
  })
  @IsString({ message: 'Type Return must be a valid enum value.' })
  @IsOptional()
  typeReturn: TypeReturn;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The date and time when the health insurance was created.',
    required: false,
  })
  @IsString({ message: 'Created At must be a valid date.' })
  @IsOptional()
  createdAt?: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description:
      'The date and time when the health insurance was last updated.',
    required: false,
  })
  @IsString({ message: 'Created At must be a valid date.' })
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
