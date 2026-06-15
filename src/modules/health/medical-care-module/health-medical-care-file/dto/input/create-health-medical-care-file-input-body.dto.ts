import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateHealthMedicalCareFileInputBodyDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the medical care file.',
    required: false,
  })
  @IsString({ message: 'Account ID must be a string.' })
  @IsUUID(4, { message: 'Account ID must be a valid UUID.' })
  @IsOptional()
  accountId?: string;

  @ApiProperty({
    example: 'e5f6a7b8-9012-34ef-abcd-5678901234ef',
    description: 'The ID of the health medical care record this file belongs to.',
  })
  @IsString({ message: 'Health Medical Care ID must be a string.' })
  @IsUUID(4, { message: 'Health Medical Care ID must be a valid UUID.' })
  @IsNotEmpty({ message: 'Health Medical Care ID is required.' })
  healthMedicalCareId: string;

  @ApiProperty({
    example: 'uploads/medical-care/2024/01/exam-result.pdf',
    description: 'The S3 file path for the uploaded file.',
  })
  @IsString({ message: 'Path File must be a string.' })
  @IsNotEmpty({ message: 'Path File is required.' })
  @MaxLength(255, { message: 'Path File must not exceed 255 characters.' })
  pathFile: string;
}
