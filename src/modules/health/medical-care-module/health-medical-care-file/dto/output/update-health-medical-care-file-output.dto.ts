import { ApiProperty } from '@nestjs/swagger';

export class UpdateHealthMedicalCareFileOutputDto {
  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The unique identifier of the medical care file record.',
  })
  id: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    description: 'The account associated with the medical care file.',
  })
  accountId: string;

  @ApiProperty({
    example: 'e5f6a7b8-9012-34ef-abcd-5678901234ef',
    description: 'The ID of the health medical care record this file belongs to.',
  })
  healthMedicalCareId: string;

  @ApiProperty({
    example: 'uploads/medical-care/2024/01/updated-exam-result.pdf',
    description: 'The updated S3 file path for the uploaded file.',
  })
  pathFile: string;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the medical care file record was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:00:00Z',
    description: 'The date and time when the medical care file record was last updated.',
  })
  updatedAt: Date;

  @ApiProperty({
    example: null,
    description: 'The date and time when the medical care file record was deleted.',
    nullable: true,
  })
  deletedAt: Date | null;
}
