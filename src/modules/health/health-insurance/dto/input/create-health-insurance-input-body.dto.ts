import { ApiProperty } from '@nestjs/swagger';
import { TypeReturn } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateHealthInsuranceInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the health insurance.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId: string;

  @ApiProperty({
    example: 'Health Plan A',
    description: 'The name of the health insurance.',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @ApiProperty({
    example: false,
    default: false,
    description: 'Indicates if the health insurance is corporate.',
  })
  @IsBoolean({ message: 'Flag Corporate must be a boolean.' })
  @IsNotEmpty({ message: 'Flag Corporate is required.' })
  flagCoperate: boolean;

  @ApiProperty({
    example: 100.89,
    description: 'The cost price of the health insurance.',
  })
  @IsNumber({}, { message: 'Cost Price must be a number.' })
  @IsNotEmpty({ message: 'Cost Price is required.' })
  costPrice: number;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth related to the health insurance.',
  })
  @IsNotEmpty({ message: 'Date of Birthday is required.' })
  dateOfBirthday: Date;

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
  @IsNotEmpty({ message: 'Type Return is required.' })
  typeReturn: TypeReturn;
}
