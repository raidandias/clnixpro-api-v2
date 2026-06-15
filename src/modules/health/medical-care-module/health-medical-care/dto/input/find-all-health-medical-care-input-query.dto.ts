import { ApiProperty } from '@nestjs/swagger';
import { HealthMedicalCareStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllHealthMedicalCareInputQueryDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'Filter by account ID.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'Filter by professional ID.',
    required: false,
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsOptional()
  professionalId?: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'Filter by patient ID.',
    required: false,
  })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsOptional()
  patientId?: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'Filter by schedule ID.',
    required: false,
  })
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsOptional()
  scheduleId?: string;

  @ApiProperty({
    example: HealthMedicalCareStatus.WAITING,
    description: 'Filter by the status of the medical care record.',
    enum: HealthMedicalCareStatus,
    required: false,
  })
  @IsEnum(HealthMedicalCareStatus, { message: 'Status must be a valid HealthMedicalCareStatus.' })
  @IsOptional()
  status?: HealthMedicalCareStatus;

  @ApiProperty({
    example: 1,
    description: 'Page number for pagination.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'Page is required.' })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page.',
    required: true,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNotEmpty({ message: 'PerPage is required.' })
  perPage: number;
}
