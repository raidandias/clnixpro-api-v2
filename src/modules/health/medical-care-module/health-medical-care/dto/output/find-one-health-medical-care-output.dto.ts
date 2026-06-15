import { ApiProperty } from '@nestjs/swagger';
import { HealthMedicalCareStatus } from '@prisma/client';

export class FindOneHealthMedicalCareOutputDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the medical care record.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the medical care record.',
  })
  accountId: string;

  @ApiProperty({
    example: 'b2c3d4e5-6789-01bc-defa-2345678901bc',
    description: 'The ID of the professional performing the medical care.',
  })
  professionalId: string;

  @ApiProperty({
    example: 'c3d4e5f6-7890-12cd-efab-3456789012cd',
    description: 'The ID of the patient receiving the medical care.',
  })
  patientId: string;

  @ApiProperty({
    example: 'd4e5f6a7-8901-23de-fabc-4567890123de',
    description: 'The ID of the schedule associated with this medical care.',
  })
  scheduleId: string;

  @ApiProperty({
    example: 'Patient presents with mild fever and sore throat. Prescribed antibiotics.',
    description: 'Clinical notes describing the medical care performed.',
  })
  description: string;

  @ApiProperty({
    example: 'Patient has a history of penicillin allergy.',
    description: 'Optional observations about the medical care.',
    nullable: true,
  })
  observation: string | null;

  @ApiProperty({
    example: 'Amoxicillin 500mg, 3x per day for 7 days.',
    description: 'Optional prescription issued during the medical care.',
    nullable: true,
  })
  prescription: string | null;

  @ApiProperty({
    example: HealthMedicalCareStatus.WAITING,
    description: 'The current status of the medical care record.',
    enum: HealthMedicalCareStatus,
  })
  status: HealthMedicalCareStatus;

  @ApiProperty({
    example: '2024-01-15T09:00:00Z',
    description: 'The start date and time of the medical care.',
  })
  startAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The end date and time of the medical care.',
  })
  endAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the medical care record was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the medical care record was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the medical care record was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
