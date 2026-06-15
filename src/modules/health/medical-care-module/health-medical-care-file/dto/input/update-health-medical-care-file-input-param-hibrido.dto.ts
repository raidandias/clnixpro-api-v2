import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateHealthMedicalCareFileInputParamDto {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'The unique identifier of the medical care file record to update.',
  })
  @IsString({ message: 'The Id field must be a string.' })
  @IsNotEmpty({ message: 'The Id field must not be empty.' })
  @IsUUID(4, { message: 'The Id field must be a valid UUIDv4.' })
  id: string;
}

export class UpdateHealthMedicalCareFileInputBodyDto {
  @ApiProperty({
    example: 'uploads/medical-care/2024/01/updated-exam-result.pdf',
    description: 'The updated S3 file path for the uploaded file.',
    required: false,
  })
  @IsString({ message: 'Path File must be a string.' })
  @IsOptional()
  @MaxLength(255, { message: 'Path File must not exceed 255 characters.' })
  pathFile?: string;
}
