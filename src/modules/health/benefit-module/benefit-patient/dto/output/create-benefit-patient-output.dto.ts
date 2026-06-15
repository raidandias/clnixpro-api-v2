import { ApiProperty } from '@nestjs/swagger';
import { BenefitStatus } from '@prisma/client';

export class CreateBenefitPatientOutputDto {
  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The unique identifier of the benefit patient',
  })
  id: string;

  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit patient',
  })
  accountId: string;

  @ApiProperty({
    example: 'f1e2d3c4-5678-90ab-cdef-1234567890ab',
    description: 'The benefit ID associated with the benefit patient',
  })
  benefitId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The patient ID associated with the benefit patient',
  })
  patientId: string;

  @ApiProperty({
    example: BenefitStatus.WAITING_PAYMENT,
    description: 'The status of the benefit patient',
    enum: BenefitStatus,
  })
  status: BenefitStatus;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit patient was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the benefit patient was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time when the benefit patient was deleted',
    nullable: true,
  })
  deletedAt?: Date;
}
