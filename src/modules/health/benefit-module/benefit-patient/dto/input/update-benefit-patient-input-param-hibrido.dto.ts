import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { BenefitStatus } from '@prisma/client';

export class UpdateBenefitPatientInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the benefit patient',
  })
  @IsString({ message: 'The Id field must be a string' })
  @IsNotEmpty({ message: 'The Id field must not be empty' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4' })
  id: string;
}

export class UpdateBenefitPatientInputBodyDto {
  @ApiProperty({
    example: BenefitStatus.ENABLED,
    description: 'The status of the benefit patient',
    enum: BenefitStatus,
    required: false,
  })
  @IsEnum(BenefitStatus, { message: 'Status must be a valid BenefitStatus.' })
  @IsOptional()
  status?: BenefitStatus;
}
