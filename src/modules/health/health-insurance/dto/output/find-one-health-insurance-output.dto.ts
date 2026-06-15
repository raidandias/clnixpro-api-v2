import { ApiProperty } from '@nestjs/swagger';
import { TypeReturn } from '@prisma/client';

export class FindOneHealthInsuranceOutputDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier for the health insurance.',
    required: true,
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the health insurance.',
    required: true,
  })
  accountId: string;

  @ApiProperty({
    example: 'Health Plan A',
    description: 'The name of the health insurance.',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: false,
    description: 'Indicates if the health insurance is corporate.',
    required: true,
  })
  flagCoperate: boolean;

  @ApiProperty({
    example: 100.89,
    description: 'The cost price of the health insurance.',
    required: true,
  })
  costPrice: number;

  @ApiProperty({
    example: '1990-01-01',
    description: 'The date of birth related to the health insurance.',
    required: true,
  })
  dateOfBirthday: Date;

  @ApiProperty({
    example: '/documents/health-insurance.pdf',
    description: 'The path to the document of the health insurance.',
    required: true,
  })
  pathDocument?: string;

  @ApiProperty({
    example: '/logo/health-insurance.pdf',
    description: 'The path to the logo of the health insurance.',
    required: true,
  })
  pathLogo?: string;

  @ApiProperty({
    example: TypeReturn.NOT_RETURN,
    description: 'The type of return for the health insurance.',
    enum: TypeReturn,
    required: true,
  })
  typeReturn: TypeReturn;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The date and time when the health insurance was created.',
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description:
      'The date and time when the health insurance was last updated.',
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'The date and time when the health insurance was deleted.',
    required: true,
  })
  deletedAt: Date;
}
