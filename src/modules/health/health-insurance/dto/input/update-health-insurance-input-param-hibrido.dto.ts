import { ApiProperty } from '@nestjs/swagger';
import { TypeReturn } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateHealthInsuranceInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateHealthInsuranceInputBodyDto {
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
  })
  @IsString({ message: 'Name must be a string.' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the health insurance is corporate.',
  })
  @IsBoolean({ message: 'Flag Corporate must be a boolean.' })
  @IsOptional()
  flagCoperate?: boolean;

  @ApiProperty({
    example: 100.87,
    description: 'The cost price of the health insurance.',
  })
  @IsNumber({}, { message: 'Cost Price must be a number.' })
  @IsOptional()
  costPrice?: number;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth related to the health insurance.',
  })
  @IsString({ message: 'Date of Birthday must be a date.' })
  @IsOptional()
  dateOfBirthday?: Date;

  @ApiProperty({
    example: '/documents/health-insurance.pdf',
    description: 'The path to the document of the health insurance.',
  })
  @IsString({ message: 'Path Document must be a string.' })
  @IsOptional()
  pathDocument?: string;

  @ApiProperty({
    example: '/logo/health-insurance.png',
    description: 'The path to the logo of the health insurance.',
  })
  @IsString({ message: 'Path Logo must be a string.' })
  @IsOptional()
  pathLogo?: string;

  @ApiProperty({
    example: TypeReturn.NOT_RETURN,
    description: 'The type of return for the health insurance.',
    enum: TypeReturn,
  })
  @IsString({ message: 'Type Return must be a valid enum value.' })
  typeReturn?: TypeReturn;
}
