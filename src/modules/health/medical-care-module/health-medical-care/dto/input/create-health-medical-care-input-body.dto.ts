import { ApiProperty } from '@nestjs/swagger';
import { HealthMedicalCareStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateHealthMedicalCareInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the medical care record.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The ID of the professional performing the medical care.',
  })
  @IsString({ message: 'Professional ID must be a string.' })
  @IsUUID(4, { message: 'Professional ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Professional ID is required.' })
  professionalId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The ID of the patient receiving the medical care.',
  })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Patient ID is required.' })
  patientId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The ID of the schedule associated with this medical care.',
  })
  @IsString({ message: 'Schedule ID must be a string.' })
  @IsUUID(4, { message: 'Schedule ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Schedule ID is required.' })
  scheduleId: string;

  @ApiProperty({
    example: 'Patient presents with mild fever and sore throat. Prescribed antibiotics.',
    description: 'Clinical notes describing the medical care performed.',
  })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

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
    example: HealthMedicalCareStatus.WAITING,
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
  })
  @IsDateString({}, { message: 'StartAt must be a valid date string.' })
  @IsNotEmpty({ message: 'StartAt is required.' })
  startAt: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the medical care.',
  })
  @IsDateString({}, { message: 'EndAt must be a valid date string.' })
  @IsNotEmpty({ message: 'EndAt is required.' })
  endAt: string;
}
