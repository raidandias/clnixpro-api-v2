import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { BenefitStatus } from '@prisma/client';

export class CreateBenefitPatientInputBodyDto {
  @ApiProperty({
    example: 'dbe5a8d5-80d7-4c9c-8d91-912d3db503e1',
    description: 'The account ID associated with the benefit patient',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'e7b7d8d6-2d77-4d1d-89b9-7eac02d8b03c',
    description: 'The benefit ID associated with the benefit patient',
  })
  @IsString({ message: 'Benefit ID must be a string.' })
  @IsUUID(4, { message: 'Benefit ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Benefit ID is required.' })
  benefitId: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The patient ID associated with the benefit patient',
  })
  @IsString({ message: 'Patient ID must be a string.' })
  @IsUUID(4, { message: 'Patient ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Patient ID is required.' })
  patientId: string;

  @ApiProperty({
    example: BenefitStatus.WAITING_PAYMENT,
    description: 'The status of the benefit patient',
    enum: BenefitStatus,
    required: false,
  })
  @IsEnum(BenefitStatus, { message: 'Status must be a valid BenefitStatus.' })
  @IsOptional()
  status?: BenefitStatus;
}
