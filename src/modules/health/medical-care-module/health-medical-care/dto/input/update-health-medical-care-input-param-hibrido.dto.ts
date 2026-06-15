import { ApiProperty } from '@nestjs/swagger';
import { HealthMedicalCareStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateHealthMedicalCareInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the medical care record to update.',
  })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateHealthMedicalCareInputBodyDto {
  @ApiProperty({
    example: 'Patient presents with mild fever and sore throat. Prescribed antibiotics.',
    description: 'Clinical notes describing the medical care performed.',
    required: false,
  })
  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Patient has a history of penicillin allergy.',
    description: 'Optional observations about the medical care.',
    required: false,
  })
  @IsString({ message: 'Observation must be a string.' })
  @IsOptional()
  observation?: string;

  @ApiProperty({
    example: 'Amoxicillin 500mg, 3x per day for 7 days.',
    description: 'Optional prescription issued during the medical care.',
    required: false,
  })
  @IsString({ message: 'Prescription must be a string.' })
  @IsOptional()
  prescription?: string;

  @ApiProperty({
    example: HealthMedicalCareStatus.IN_PROGRESS,
    description: 'The current status of the medical care record.',
    enum: HealthMedicalCareStatus,
    required: false,
  })
  @IsEnum(HealthMedicalCareStatus, { message: 'Status must be a valid HealthMedicalCareStatus.' })
  @IsOptional()
  status?: HealthMedicalCareStatus;

  @ApiProperty({
    example: '2024-01-15T09:00:00Z',
    description: 'The start date and time of the medical care.',
    required: false,
  })
  @IsDateString({}, { message: 'StartAt must be a valid date string.' })
  @IsOptional()
  startAt?: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the medical care.',
    required: false,
  })
  @IsDateString({}, { message: 'EndAt must be a valid date string.' })
  @IsOptional()
  endAt?: string;
}
